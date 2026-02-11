"use client";

import { Truck, AlertTriangle, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "motion/react";

export const RouteRiskMap = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full"
        >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Route Optimization & Risk Radar</h2>
                    <p className="text-sm text-gray-500">Real-time shipment tracking via optimized path</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <AlertTriangle size={14} /> High Risk Area Avoided
                    </span>
                    <span className="bg-green-50 text-[#1a4d2e] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <ShieldCheck size={14} /> Safe Route Active
                    </span>
                </div>
            </div>

            <div className="flex-1 relative bg-slate-50 overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}>
                </div>

                {/* SVG Route Visualization */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Safe Route Path */}
                    <path
                        d="M 100 300 Q 250 100 400 150 T 700 100"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 5"
                        className="animate-pulse"
                    />
                    {/* Alternative/Risk Path */}
                    <path
                        d="M 100 300 Q 250 400 500 350"
                        fill="none"
                        stroke="#fca5a5"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        opacity="0.6"
                    />

                    {/* Points */}
                    <circle cx="100" cy="300" r="6" fill="#1a4d2e" />
                    <circle cx="700" cy="100" r="6" fill="#ef4444" />
                </svg>

                {/* Floating Route Markers */}
                <motion.div
                    className="absolute left-[390px] top-[140px] bg-white p-2 rounded-lg shadow-lg border border-gray-200 z-10 flex flex-col items-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <Truck className="text-[#1a4d2e] w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold bg-[#1a4d2e] text-white px-2 rounded-full">In Transit</span>
                </motion.div>

                <div className="absolute left-[100px] top-[310px] bg-white px-3 py-1 rounded-full shadow border text-xs font-bold text-gray-600">
                    Designated Warehouse
                </div>

                <div className="absolute left-[680px] top-[120px] bg-white px-3 py-1 rounded-full shadow border text-xs font-bold text-gray-600">
                    Distribution Center
                </div>

                {/* Risk Radar Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl border border-gray-100 shadow w-64">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Risk Assessment</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                            <span>Weather</span>
                            <span className="text-green-600 font-bold">Low</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-[20%]"></div>
                        </div>

                        <div className="flex justify-between text-xs">
                            <span>Traffic</span>
                            <span className="text-yellow-600 font-bold">Moderate</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-yellow-500 h-full w-[45%]"></div>
                        </div>

                        <div className="flex justify-between text-xs">
                            <span>Security</span>
                            <span className="text-green-600 font-bold">Safe</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-[10%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
