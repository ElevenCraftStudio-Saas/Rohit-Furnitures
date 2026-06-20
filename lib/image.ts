/**
 * A tiny neutral blur placeholder used for all next/image blur-up.
 * Warm cream tone (#EFE7DC) so the fade-in feels on-brand.
 * URL-encoded (not base64) so it works in both server and client bundles
 * without relying on Node's Buffer.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='8'%20height='8'%3E%3Crect%20width='8'%20height='8'%20fill='%23EFE7DC'/%3E%3C/svg%3E";
