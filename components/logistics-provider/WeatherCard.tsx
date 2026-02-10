"use client";

import { Cloud } from "lucide-react";
import { useState } from "react";
import { WeatherData } from "./types";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [weather, setWeather] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeather({
      ...weather,
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsEditing(!isEditing)}
    >
      <Cloud className="w-12 h-12 text-blue-500 mb-3" />
      <p className="text-gray-600 text-sm">Weather</p>

      {isEditing ? (
        <div className="mt-3 w-full space-y-2 text-sm">
          <input
            type="number"
            name="temperature"
            value={weather.temperature}
            onChange={handleChange}
            placeholder="Temperature"
            className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="text"
            name="condition"
            value={weather.condition}
            onChange={handleChange}
            placeholder="Condition"
            className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="number"
            name="humidity"
            value={weather.humidity}
            onChange={handleChange}
            placeholder="Humidity %"
            className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
            }}
            className="w-full bg-blue-500 text-white py-1 rounded text-xs font-semibold hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-900 mt-2">{weather.temperature}°C</p>
          <p className="text-xs text-gray-500 mt-1">{weather.condition}</p>
          <p className="text-xs text-gray-500 mt-1">Humidity: {weather.humidity}%</p>
        </>
      )}
    </div>
  );
}
