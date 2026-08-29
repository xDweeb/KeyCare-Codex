import type { ExtensionReply } from "../types";

const status = document.querySelector<HTMLElement>("#status")!;
chrome.runtime
  .sendMessage({ type: "KEYCARE_HEALTH" })
  .then((reply: ExtensionReply) => {
    status.textContent = reply.ok ? "Production API connected" : `API unavailable: ${reply.error}`;
    status.className = reply.ok ? "ok" : "error";
  })
  .catch(() => {
    status.textContent = "Could not reach the production API.";
    status.className = "error";
  });
