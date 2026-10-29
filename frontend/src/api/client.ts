/**
 * API client configuration for Prompt Studio
 * Automatically handles VITE_API_BASE_URL for cross-domain production deployments (e.g. Vercel -> Render)
 * and falls back to relative paths for local development proxying.
 */

const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://prompt-studio-backend-canz.onrender.com' : '');
export const API_BASE_URL = RAW_API_BASE.replace(/\/$/, '');

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (API_BASE_URL) {
    return `${API_BASE_URL}${cleanEndpoint}`;
  }
  return cleanEndpoint;
}

export function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const url = getApiUrl(endpoint);
  return fetch(url, {
    ...options,
    // credentials: 'include' is required for cross-domain cookies between Vercel and Render
    credentials: 'include',
  });
}
