/**
 * Location Service
 * Provides reverse geocoding to convert coordinates to human-readable location names
 */

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";

/**
 * Convert latitude and longitude to a human-readable location name
 * Uses OpenWeather Geocoding API (reverse geocoding)
 * 
 * @param lat - Latitude coordinate
 * @param lon - Longitude coordinate
 * @returns Formatted location string (e.g., "Mumbai, Maharashtra" or "Pune, India")
 */
export async function getLocationName(lat: number, lon: number): Promise<string> {
    // Fallback location if API fails
    const fallbackLocation = "Mumbai, Maharashtra";

    // If no API key is available, return fallback
    if (!OPENWEATHER_API_KEY) {
        console.warn("OpenWeather API key not found. Using fallback location.");
        return fallbackLocation;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPENWEATHER_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error("No location data found");
        }

        const location = data[0];

        // Format: "City, State" or "City, Country" depending on what's available
        if (location.state) {
            return `${location.name}, ${location.state}`;
        } else {
            return `${location.name}, ${location.country}`;
        }
    } catch (error) {
        console.error("Error fetching location name:", error);
        return fallbackLocation;
    }
}

/**
 * Get location name with caching to avoid repeated API calls
 * Caches location for 1 hour
 */
const locationCache = new Map<string, { location: string; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getLocationNameCached(lat: number, lon: number): Promise<string> {
    const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
    const cached = locationCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.location;
    }

    const location = await getLocationName(lat, lon);
    locationCache.set(cacheKey, { location, timestamp: Date.now() });

    return location;
}
