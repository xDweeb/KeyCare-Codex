/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_URL?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ANDROID_DOWNLOAD_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
