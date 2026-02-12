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
    weather: WeatherData;
}

// Location API functions (moved from services/location/locationApi.ts)
const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";

async function getLocationName(lat: number, lon: number): Promise<string> {
    const fallbackLocation = "Mumbai, Maharashtra";

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

// Location cache
const locationCache = new Map<string, { location: string; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function getLocationNameCached(lat: number, lon: number): Promise<string> {
    const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
    const cached = locationCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.location;
    }

    const location = await getLocationName(lat, lon);
    locationCache.set(cacheKey, { location, timestamp: Date.now() });

    return location;
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

export default function WeatherWidget({ latitude, longitude, weather }: WeatherWidgetProps) {
    const [location, setLocation] = useState<string>("Surat");

    useEffect(() => {
        // Fetch location name from coordinates
        const fetchLocation = async () => {
            try {
                const locationName = await getLocationNameCached(latitude, longitude);
                setLocation(locationName);
            } catch (error) {
                console.error("Error fetching location:", error);
                setLocation("Surat"); // Fallback to Surat
            }
        };

        fetchLocation();
    }, [latitude, longitude]);

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
