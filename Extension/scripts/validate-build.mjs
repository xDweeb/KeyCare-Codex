import { existsSync, readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../dist/manifest.json", import.meta.url), "utf8"));
if (manifest.manifest_version !== 3) throw new Error("Manifest V3 is required");
if (JSON.stringify(manifest).includes("<all_urls>")) throw new Error("Broad host permission is not allowed");
const expectedHost = "https://keycare-codex-api-ef6679e530e7.herokuapp.com/*";
if (JSON.stringify(manifest.host_permissions) !== JSON.stringify([expectedHost])) {
  throw new Error("Unexpected host permissions");
}
const references = [manifest.action?.default_popup, manifest.background?.service_worker, ...Object.values(manifest.icons ?? {})];
for (const reference of references) {
  if (!reference || !existsSync(new URL(`../dist/${reference}`, import.meta.url))) {
    throw new Error(`Missing manifest asset: ${reference}`);
  }
}
console.log("Manifest V3 and referenced assets validated.");
