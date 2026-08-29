export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://keycare-codex-api-ef6679e530e7.herokuapp.com"
).replace(/\/$/, "");

export const TRANSFORM_ENDPOINT = "/api/v1/transform";
export const HEALTH_ENDPOINT = "/health";
