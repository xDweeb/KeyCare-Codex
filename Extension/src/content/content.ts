import type {
  ExtensionReply,
  TargetLanguage,
  TransformAction,
  TransformResponse,
} from "../types";
import "./styles.css";

type Editable = HTMLInputElement | HTMLTextAreaElement | HTMLElement;

interface SelectionSnapshot {
  target: Editable;
  text: string;
  start?: number;
  end?: number;
  range?: Range;
}

let activeEditable: Editable | null = null;
let snapshot: SelectionSnapshot | null = null;

const host = document.createElement("div");
host.id = "keycare-extension-root";
const shadow = host.attachShadow({ mode: "open" });
shadow.innerHTML = `
  <style>
    :host{all:initial}.kc-button{position:fixed;z-index:2147483646;right:20px;bottom:20px;border:0;border-radius:999px;padding:10px 14px;background:#111827;color:#2dd4bf;font:700 13px system-ui;box-shadow:0 8px 24px #0004;cursor:pointer}.kc-panel{display:none;position:fixed;z-index:2147483647;right:20px;bottom:68px;width:min(360px,calc(100vw - 32px));box-sizing:border-box;border:1px solid #334155;border-radius:16px;padding:16px;background:#0f172a;color:#e2e8f0;font:13px/1.45 system-ui;box-shadow:0 18px 50px #0008}.kc-panel.open{display:block}.kc-title{font-size:17px;font-weight:800;color:#2dd4bf}.kc-sub{margin:2px 0 12px;color:#94a3b8}.kc-actions,.kc-footer{display:flex;flex-wrap:wrap;gap:7px}.kc-actions button,.kc-footer button,.kc-select{border:1px solid #475569;border-radius:8px;padding:7px 9px;background:#1e293b;color:#f8fafc;font:600 12px system-ui;cursor:pointer}.kc-actions button:hover,.kc-footer button:hover{border-color:#2dd4bf}.kc-select{width:100%;margin:9px 0}.kc-status{min-height:18px;margin:10px 0;color:#94a3b8}.kc-result{display:none;white-space:pre-wrap;max-height:180px;overflow:auto;border-radius:9px;padding:10px;background:#020617;color:#f8fafc}.kc-result.show{display:block}.kc-meta{margin:8px 0;color:#94a3b8}.kc-footer{margin-top:10px}.kc-footer .primary{background:#0f766e;border-color:#14b8a6}.kc-close{float:right;border:0;background:transparent;color:#94a3b8;cursor:pointer;font-size:18px}
  </style>
  <button class="kc-button" type="button">✦ KeyCare</button>
  <section class="kc-panel" role="dialog" aria-label="KeyCare communication actions">
    <button class="kc-close" type="button" aria-label="Close">×</button>
    <div class="kc-title">KeyCare</div><div class="kc-sub">Think before you send.</div>
    <div class="kc-actions">
      <button data-action="improve">Improve</button><button data-action="professional">Professional</button>
      <button data-action="calm">Calm</button><button data-action="respectful">Respectful</button>
      <button data-action="analyze">Tone Check</button><button data-action="translate">Translate</button>
    </div>
    <select class="kc-select" aria-label="Translation language">
      <option value="en">English</option><option value="fr">French</option><option value="ar">Arabic</option><option value="darija">Darija</option>
    </select>
    <div class="kc-status" aria-live="polite"></div><div class="kc-result"></div><div class="kc-meta"></div>
    <div class="kc-footer"><button class="kc-copy" type="button">Copy</button><button class="kc-replace primary" type="button">Replace selection</button><button class="kc-cancel" type="button">Cancel</button></div>
  </section>`;
document.documentElement.appendChild(host);

const button = shadow.querySelector<HTMLButtonElement>(".kc-button")!;
const panel = shadow.querySelector<HTMLElement>(".kc-panel")!;
const status = shadow.querySelector<HTMLElement>(".kc-status")!;
const resultNode = shadow.querySelector<HTMLElement>(".kc-result")!;
const metaNode = shadow.querySelector<HTMLElement>(".kc-meta")!;
const targetSelect = shadow.querySelector<HTMLSelectElement>(".kc-select")!;
let latest: TransformResponse | null = null;

function isEditable(element: Element | null): element is Editable {
  if (element instanceof HTMLTextAreaElement) return !element.disabled && !element.readOnly;
  if (element instanceof HTMLInputElement) {
    return ["text", "email", "search", "url", "tel"].includes(element.type) && !element.disabled && !element.readOnly;
  }
  return element instanceof HTMLElement && element.isContentEditable;
}

function capture(target: Editable): SelectionSnapshot | null {
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? start;
    const selected = target.value.slice(start, end);
    return { target, text: selected || target.value, start: selected ? start : 0, end: selected ? end : target.value.length };
  }
  const selection = window.getSelection();
  if (selection && selection.rangeCount && !selection.isCollapsed && target.contains(selection.anchorNode)) {
    const range = selection.getRangeAt(0).cloneRange();
    return { target, text: range.toString(), range };
  }
  return { target, text: target.innerText, range: undefined };
}

function replace(snapshotToUse: SelectionSnapshot, replacement: string): void {
  const { target } = snapshotToUse;
  target.focus();
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    target.setRangeText(replacement, snapshotToUse.start ?? 0, snapshotToUse.end ?? target.value.length, "end");
  } else if (snapshotToUse.range) {
    snapshotToUse.range.deleteContents();
    snapshotToUse.range.insertNode(document.createTextNode(replacement));
  } else {
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand("insertText", false, replacement);
  }
  target.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: replacement }));
  target.dispatchEvent(new Event("change", { bubbles: true }));
}

async function runAction(action: TransformAction): Promise<void> {
  if (!activeEditable) return;
  snapshot = capture(activeEditable);
  if (!snapshot?.text.trim()) {
    status.textContent = "Select text or focus a non-empty editable field.";
    return;
  }
  latest = null;
  resultNode.classList.remove("show");
  metaNode.textContent = "";
  status.textContent = "Asking KeyCare…";
  const targetLanguage = action === "translate" ? (targetSelect.value as TargetLanguage) : undefined;
  const reply = (await chrome.runtime.sendMessage({
    type: "KEYCARE_TRANSFORM",
    payload: { text: snapshot.text, action, ...(targetLanguage ? { target_language: targetLanguage } : {}) },
  })) as ExtensionReply;
  if (!reply.ok) {
    status.textContent = reply.error;
    return;
  }
  latest = reply.data as TransformResponse;
  status.textContent = action === "analyze" ? "Tone analysis" : "Suggestion ready — you choose what happens next.";
  resultNode.textContent = latest.result;
  resultNode.classList.add("show");
  const languages = latest.analysis.detected_languages.join(" + ") || "unknown";
  metaNode.textContent = `Tone: ${latest.analysis.tone} • Languages: ${languages}${latest.analysis.arabizi ? " • Arabizi" : ""}${latest.analysis.code_switched ? " • code-switched" : ""}`;
}

document.addEventListener("focusin", (event) => {
  if (isEditable(event.target as Element)) activeEditable = event.target as Editable;
});
button.addEventListener("click", () => {
  if (!activeEditable && isEditable(document.activeElement)) activeEditable = document.activeElement;
  panel.classList.add("open");
  status.textContent = activeEditable ? "Choose an action." : "Focus an editable field first.";
});
shadow.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((item) =>
  item.addEventListener("click", () => void runAction(item.dataset.action as TransformAction)),
);
shadow.querySelector(".kc-copy")?.addEventListener("click", async () => {
  if (!latest) return;
  await navigator.clipboard.writeText(latest.result);
  status.textContent = "Copied. Nothing was sent or replaced.";
});
shadow.querySelector(".kc-replace")?.addEventListener("click", () => {
  if (!latest || !snapshot) return;
  replace(snapshot, latest.result);
  status.textContent = "Replaced. Sending remains under your control.";
});
shadow.querySelectorAll(".kc-close,.kc-cancel").forEach((item) =>
  item.addEventListener("click", () => panel.classList.remove("open")),
);
