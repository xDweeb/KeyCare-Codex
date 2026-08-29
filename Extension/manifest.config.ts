import { defineManifest } from "@crxjs/vite-plugin";

export const manifest = defineManifest({
  manifest_version: 3,
  name: "KeyCare",
  version: "1.0.4",
  description:
    "Think before you send. AI communication intelligence for Darija, Arabizi, Arabic, French, and English.",
  homepage_url: "https://keycare.ma",
  icons: {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png",
  },
  action: {
    default_title: "KeyCare — Think before you send",
    default_popup: "src/popup/index.html",
    default_icon: {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png",
    },
  },
  background: {
    service_worker: "src/background/service-worker.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content/content.ts"],
      run_at: "document_idle",
      all_frames: true,
    },
  ],
  permissions: ["storage", "clipboardWrite"],
  host_permissions: [
    "http://localhost:*/*",
    "http://127.0.0.1:*/*",
    "https://api.keycare.ma/*",
    "https://*.keycare.ma/*",
  ],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
});
