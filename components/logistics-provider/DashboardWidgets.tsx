"use client";

import { CloudSun, Star } from "lucide-react";
import { motion } from "motion/react";

export const WeatherWidget = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <CloudSun size={80} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium self-start mb-4">Weather Today</h3>
            <div className="flex items-center gap-4 z-10">
                <CloudSun className="text-yellow-400 w-12 h-12" />
                <div>
                    <span className="text-4xl font-bold text-gray-800">24°C</span>
                    <p className="text-gray-500 text-sm">Sunny</p>
                </div>
            </div>
            <div className="mt-4 flex gap-4 text-xs text-gray-400 w-full justify-between px-4">
                <span>Humidity: 45%</span>
                <span>Wind: 12km/h</span>
            </div>
        </motion.div>
    );
};

export const RatingWidget = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden"
        >
            <h3 className="text-gray-500 text-sm font-medium mb-2">Driver Rating</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-100"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-[#4ade80]"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 * 0.15} // 85% filled
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-800">4.8</span>
                        <div className="flex text-yellow-400">
                            <Star size={10} fill="currentColor" />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Excellent Service</p>
                <p className="text-xs text-gray-400 mt-1">
                    Based on <span className="font-semibold text-gray-600">1,284</span> trips
                </p>
            </div>
        </motion.div>
    );
};

export const GifWidget = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full bg-white p-0 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHVpOGF2cjZjYWxxMHZ2Nm9peWR5ZGhibnd0aDBoOHhmbWlqZ3VlYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0T0FUiZl51VPCLsqLR/giphy.gif"
                alt="Logistics Animation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundColor: '#e5e7eb' }}
            />

        </motion.div>
    );
};
