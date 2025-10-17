export type CityWithPostalCode = { postalCode: string; name: string };

let cache: CityWithPostalCode[] | null = null;
let loading: Promise<CityWithPostalCode[]> | null = null;

export async function loadPostalCodes(): Promise<CityWithPostalCode[]> {
  if (cache) return cache;
  if (loading) return loading;
  // Try several possible public paths to be resilient if the file was placed
  // somewhere else by accident. Log each attempt so it's easy to debug
  // in the browser console (or dev server terminal).
  // Respect PUBLIC_URL (CRA) if app is served from a sub-path.
  const publicUrl = (process.env as any).PUBLIC_URL || "";
  const base = publicUrl.replace(/\/$/, "");

  // Try the base-prefixed path first, then the absolute path.
  const possiblePaths = [
    `${base}/data/fr_postal_codes.json`,
    "/data/fr_postal_codes.json",
  ];

  // Single shared promise so concurrent callers wait for the same fetch
  loading = (async () => {
    for (const p of possiblePaths) {
      try {
        const res = await fetch(p);
        if (!res.ok) {
          // try next path
          continue;
        }

        const contentType = (
          res.headers.get("content-type") || ""
        ).toLowerCase();
        if (!contentType.includes("application/json")) {
          // Server returned HTML (probably index.html), skip this path
          continue;
        }

        const data = (await res.json()) as CityWithPostalCode[];
        if (!Array.isArray(data)) continue;
        cache = data;
        console.info(`[postalCodes] loaded ${data.length} items from ${p}`);
        loading = null;
        return data;
      } catch (err) {
        // try next path
      }
    }

    // If nothing succeeded, return an empty array instead of throwing so the
    // application can continue to operate and we can surface an empty list to UI.
    console.error(
      "[postalCodes] could not load postal codes from any known path. Expected file: public/data/fr_postal_codes.json"
    );
    cache = [];
    loading = null;
    return cache;
  })();

  return loading;
}

export async function searchByPrefix(
  prefix: string,
  limit = 50
): Promise<CityWithPostalCode[]> {
  const list = await loadPostalCodes();
  const p = prefix.trim().toLowerCase();
  if (!p) return [];

  const results: CityWithPostalCode[] = [];
  for (let i = 0; i < list.length && results.length < limit; i++) {
    const item = list[i];
    if (
      item.postalCode.toString().startsWith(p) ||
      item.name.toLowerCase().includes(p)
    ) {
      results.push(item);
    }
  }
  return results;
}
