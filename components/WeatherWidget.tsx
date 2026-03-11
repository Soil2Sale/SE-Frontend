"use client";

import React, { useState, useEffect } from "react";
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Cloud,
} from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  advisory: string;
  uv_index: number;
  max_temp: number;
  min_temp: number;
  next_rain: string;
}

interface WeatherWidgetProps {
  latitude: number;
  longitude: number;
  weather?: WeatherData;
}

// Reverse geocoding via Nominatim (OpenStreetMap) — no API key needed
async function getLocationName(lat: number, lon: number): Promise<string> {
  const fallbackLocation = "Mumbai, Maharashtra";
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "Accept-Language": "en" } },
    );
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    const addr = data.address ?? {};
    const city = addr.city || addr.town || addr.village || addr.county || "";
    const state = addr.state || "";
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
    return fallbackLocation;
  } catch {
    return fallbackLocation;
  }
}

// Location cache
const locationCache = new Map<
  string,
  { location: string; timestamp: number }
>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function getLocationNameCached(
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

const FALLBACK_WEATHER: WeatherData = {
  temp: 32,
  condition: "Clear Sky",
  humidity: 60,
  wind_speed: 14,
  pressure: 1012,
  advisory: "",
  uv_index: 6,
  max_temp: 35,
  min_temp: 28,
  next_rain: "N/A",
};

function wmoToCondition(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Drizzle";
  if (code <= 65) return "Rain";
  if (code <= 75) return "Snow";
  if (code <= 82) return "Rain Showers";
  if (code <= 99) return "Thunderstorm";
  return "Clear Sky";
}

async function fetchLiveWeather(
  lat: number,
  lon: number,
): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max` +
    `&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo fetch failed: ${res.status}`);
  const data = await res.json();

  const current = data.current ?? {};
  const daily = data.daily ?? {};

  const precipProb: number = daily.precipitation_probability_max?.[0] ?? 0;
  const weatherCode: number = current.weather_code ?? 0;
  const condition = wmoToCondition(weatherCode);
  const nextRain =
    condition.toLowerCase().includes("rain") ||
    condition.toLowerCase().includes("drizzle")
      ? "Now"
      : precipProb > 0
        ? `${precipProb}%`
        : "N/A";

  return {
    temp: Math.round(current.temperature_2m ?? 32),
    condition,
    humidity: Math.round(current.relative_humidity_2m ?? 60),
    wind_speed: Math.round(current.wind_speed_10m ?? 14),
    pressure: Math.round(current.surface_pressure ?? 1012),
    advisory: "",
    uv_index: Math.round(daily.uv_index_max?.[0] ?? 6),
    max_temp: Math.round(daily.temperature_2m_max?.[0] ?? 35),
    min_temp: Math.round(daily.temperature_2m_min?.[0] ?? 28),
    next_rain: nextRain,
  };
}

function WeatherIcon({ condition }: { condition: string }) {
  const c = condition.toLowerCase();
  if (c.includes("rain"))
    return <CloudRain className="w-16 h-16 text-[#0ea5e9] drop-shadow-md" />;
  if (c.includes("cloud"))
    return <Cloud className="w-16 h-16 text-gray-400 drop-shadow-md" />;
  if (c.includes("storm") || c.includes("lightning"))
    return (
      <CloudLightning className="w-16 h-16 text-purple-500 drop-shadow-md" />
    );
  if (c.includes("snow"))
    return <CloudSnow className="w-16 h-16 text-blue-200 drop-shadow-md" />;
  return <CloudSun className="w-16 h-16 text-[#fbbf24] drop-shadow-md" />;
}

export default function WeatherWidget({
  latitude,
  longitude,
  weather: weatherProp,
}: WeatherWidgetProps) {
  const [location, setLocation] = useState<string>("Loading...");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(
    weatherProp ?? null,
  );
  const [fetching, setFetching] = useState(!weatherProp);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationName = await getLocationNameCached(latitude, longitude);
        setLocation(locationName);
      } catch {
        setLocation("Unknown");
      }
    };
    fetchLocation();
  }, [latitude, longitude]);

  useEffect(() => {
    const fetchWeather = async () => {
      setFetching(true);
      try {
        const data = await fetchLiveWeather(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch live weather:", error);
        setWeatherData(FALLBACK_WEATHER);
      } finally {
        setFetching(false);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  if (fetching && !weatherData) {
    return (
      <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-3xl p-5 shadow-sm flex items-center justify-center min-h-[220px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#15803d]" />
      </div>
    );
  }

  const weather = weatherData!;

  return (
    <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden h-full min-h-[220px]">
      {/* Top Row: Location & Temp Range */}
      <div className="flex justify-between items-start z-10 w-full">
        <div>
          <h3 className="text-[#15803d] font-bold text-lg leading-tight">
            {location}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[#15803d] font-bold text-sm">
          <span className="flex items-center gap-1">▲ {weather.max_temp}°</span>
          <span className="flex items-center gap-1 opacity-70">
            ▼ {weather.min_temp}°
          </span>
        </div>
      </div>

      {/* Middle: Main Temp (Left) & Icon/Condition (Right) */}
      <div className="flex justify-between items-center w-full px-1 z-10 my-4">
        {/* Left: Temp */}
        <div className="text-6xl font-bold text-[#14532d] tracking-tighter leading-none">
          {weather.temp}°C
        </div>

        {/* Right: Icon & Condition */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-1 transform scale-110">
            <WeatherIcon condition={weather.condition} />
          </div>
          <p className="text-[#15803d] font-bold text-sm leading-tight">
            {weather.condition}
          </p>
        </div>
      </div>

      {/* Bottom: Farming Metrics */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl p-3 z-10 border border-white/50 shadow-sm w-full mt-auto">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-xs text-[#15803d] font-bold uppercase mb-0.5">
              UV Index
            </p>
            <p className="text-lg font-bold text-[#14532d] leading-none">
              {weather.uv_index}{" "}
              <span className="text-xs font-normal opacity-70">High</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#15803d] font-bold uppercase mb-0.5">
              Humidity
            </p>
            <p className="text-lg font-bold text-[#14532d] leading-none">
              {weather.humidity}%
            </p>
          </div>
        </div>

        {/* Extra Farming Data Row */}
        <div className="flex justify-between pt-2 border-t border-[#15803d]/10 text-xs text-[#166534] font-medium">
          <div className="flex items-center gap-1.5">
            <Wind className="w-4 h-4" />
            <span>{weather.wind_speed} km/h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-4 h-4" />
            <span>Rain: {weather.next_rain}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
