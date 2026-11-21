// Every request to the Strapi API goes through here so a slow or sleeping CMS can't hang
// the page until the host (e.g. Netlify Functions) kills the request with a timeout screen.
export const API_TIMEOUT_MS = 4000;

export function apiFetch(path: string): Promise<Response> {
  return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });
}

// Small in-memory cache for CMS reads. While a serverless instance is warm, repeat visits skip
// the CMS round trip entirely, and if the CMS is down or asleep we serve the last good copy
// instead of an empty page.
const cache = new Map<string, { at: number; data: unknown }>();
const FRESH_MS = 5 * 60 * 1000;

export async function apiJson<T>(path: string): Promise<T> {
  const hit = cache.get(path);
  if (hit && Date.now() - hit.at < FRESH_MS) return hit.data as T;

  try {
    const res = await apiFetch(path);
    if (!res.ok) throw new Error(`CMS responded ${res.status} for ${path}`);
    const data = (await res.json()) as T;
    cache.set(path, { at: Date.now(), data });
    return data;
  } catch (error) {
    if (hit) return hit.data as T; // stale beats nothing
    throw error;
  }
}
