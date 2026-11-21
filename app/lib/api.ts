// Every request to the Strapi API goes through here so a slow or sleeping CMS can't hang
// the page until the host (e.g. Netlify Functions) kills the request with a timeout screen.
export const API_TIMEOUT_MS = 4000;

export function apiFetch(path: string): Promise<Response> {
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });
}
