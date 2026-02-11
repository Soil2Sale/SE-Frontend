"use client";

import { TrendingUp, DollarSign, Wallet } from "lucide-react";
import { motion } from "motion/react";

export const CostProfitChart = () => {
    const data = [
        { label: "Mon", cost: 40, profit: 60 },
        { label: "Tue", cost: 30, profit: 70 },
        { label: "Wed", cost: 50, profit: 55 },
        { label: "Thu", cost: 45, profit: 65 },
        { label: "Fri", cost: 35, profit: 80 },
        { label: "Sat", cost: 20, profit: 90 },
        { label: "Sun", cost: 25, profit: 85 },
    ];

    const maxVal = 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full p-6"
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Financial Analysis</h3>
                    <p className="text-sm text-gray-500">Weekly Cost vs Profit</p>
                </div>
                <div className="bg-green-50 p-2 rounded-lg text-[#1a4d2e]">
                    <TrendingUp size={20} />
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Wallet size={12} /> Total Cost
                    </div>
                    <p className="text-lg font-bold text-gray-800">$1,250</p>
                </div>
                <div className="flex-1 bg-green-50 p-3 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 text-[#1a4d2e] text-xs mb-1">
                        <DollarSign size={12} /> Net Profit
                    </div>
                    <p className="text-lg font-bold text-[#1a4d2e]">$3,420</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="flex-1 flex items-end justify-between gap-2 h-40">
                {data.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end group cursor-pointer">
                        <div className="relative w-full flex gap-1 items-end justify-center h-full">
                            {/* Cost Bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(day.cost / maxVal) * 100}%` }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="w-3 bg-gray-300 rounded-t-sm group-hover:bg-gray-400 transition-colors"
                            />
                            {/* Profit Bar */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(day.profit / maxVal) * 100}%` }}
                                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                                className="w-3 bg-[#4ade80] rounded-t-sm group-hover:bg-[#22c55e] transition-colors shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                            />
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{day.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
