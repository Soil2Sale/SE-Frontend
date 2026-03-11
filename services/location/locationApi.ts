/**
 * Location Service
 * Reverse geocoding via Nominatim (OpenStreetMap) — no API key required
 */

/**
 * Convert latitude/longitude to a human-readable city/state string.
 */
export async function getLocationName(
  lat: number,
  lon: number,
): Promise<string> {
  const fallback = "India";
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "Accept-Language": "en" } },
    );
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    const addr = data.address ?? {};
    const city = addr.city || addr.town || addr.village || addr.county || "";
    const state = addr.state || "";
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Get location from the browser's geolocation API, then resolve to a city name.
 * Resolves to an empty string if permission is denied or API unavailable.
 */
export async function getLocationFromBrowser(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      resolve("");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const name = await getLocationNameCached(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        resolve(name);
      },
      () => resolve(""),
      { timeout: 8000 },
    );
  });
}

/**
 * Get location name with caching to avoid repeated API calls
 * Caches location for 1 hour
 */
const locationCache = new Map<
  string,
  { location: string; timestamp: number }
>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getLocationNameCached(
  lat: number,
  lon: number,
): Promise<string> {
  const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
  const cached = locationCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.location;
  }

  const location = await getLocationName(lat, lon);
  locationCache.set(cacheKey, { location, timestamp: Date.now() });

  return location;
}
