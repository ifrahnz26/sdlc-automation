// Normalize BACKEND_URL to remove trailing slash to prevent double slashes in URLs
const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || '';
export const BACKEND_URL = rawBackendUrl.replace(/\/+$/, ''); // Remove trailing slashes