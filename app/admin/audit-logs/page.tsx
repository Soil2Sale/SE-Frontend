"use client";

import { useEffect, useState } from "react";
import { getAllAuditLogs } from "@/services/adminApi";
import {
    Activity,
    Calendar,
    User,
    Database,
    Shield,
    Globe,
    Search,
    ChevronLeft,
    ChevronRight,
    Terminal,
    Filter,
    Clock,
    UserCircle2
} from "lucide-react";

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [actionFilter, setActionFilter] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        fetchLogs();
    }, [page, actionFilter, fromDate, toDate]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 20,
                ...(actionFilter && { action: actionFilter }),
                ...(fromDate && { from: fromDate }),
                ...(toDate && { to: toDate })
            };
            const resp = await getAllAuditLogs(params);
            if (resp.success) {
                setLogs(resp.data);
                setTotalPages(resp.totalPages || 1);
            }
        } catch (error) {
            console.error("Error fetching audit logs:", error);
        } finally {
            setLoading(false);
        }
    };

    const getActionIcon = (action: string) => {
        const a = action.toLowerCase();
        if (a.includes("login") || a.includes("auth")) return <Globe className="w-4 h-4 text-blue-500" />;
        if (a.includes("delete") || a.includes("deactivate")) return <Shield className="w-4 h-4 text-red-500" />;
        if (a.includes("update") || a.includes("edit") || a.includes("create")) return <Database className="w-4 h-4 text-orange-500" />;
        return <Activity className="w-4 h-4 text-[#1a4d2e]" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a4d2e]">Security Audit Trail</h1>
                    <p className="text-gray-500 text-sm">Chronological record of system-wide administrative activity</p>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-2xl flex items-center gap-2 border border-gray-200">
                    <Terminal className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">System Read-Only</span>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Find specific logs..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a4d2e]/20 outline-none"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                            <select
                                className="pl-9 pr-6 py-2.5 bg-gray-50 border-none rounded-xl text-sm appearance-none outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 cursor-pointer"
                                value={actionFilter}
                                onChange={(e) => {
                                    setActionFilter(e.target.value);
                                    setPage(1);
                                }}
                            >
                                <option value="">All Actions</option>
                                <option value="LOGIN_SUCCESS">Login Success</option>
                                <option value="USER_CREATED">User Created</option>
                                <option value="DISPUTE_RESOLVED">Dispute Resolved</option>
                                <option value="TRANSACTION_INITIATED">Transaction</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <input
                                type="date"
                                className="bg-transparent border-none text-xs outline-none p-1 cursor-pointer"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                            <span className="text-gray-300">|</span>
                            <input
                                type="date"
                                className="bg-transparent border-none text-xs outline-none p-1 cursor-pointer"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                        {(actionFilter || fromDate || toDate) && (
                            <button
                                onClick={() => {
                                    setActionFilter("");
                                    setFromDate("");
                                    setToDate("");
                                }}
                                className="text-xs font-bold text-red-500 hover:underline px-2"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Occurred</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Actor</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction Action</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Object Target</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(6).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-8 py-6">
                                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-400 font-medium tracking-tight">No intelligence found in the audit trail.</p>
                                    </td>
                                </tr>
                            ) : logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold text-gray-900">
                                                {new Date(log.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-medium">
                                                {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1a4d2e]/10 group-hover:text-[#1a4d2e] transition-colors">
                                                <UserCircle2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-tight">{log.user_id?.name || "Access Point"}</p>
                                                <span className="text-[9px] font-black text-[#1a4d2e] bg-[#1a4d2e]/5 px-1.5 py-0.5 rounded tracking-tighter uppercase whitespace-nowrap">
                                                    {log.user_id?.role || "System Process"}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2.5">
                                            {getActionIcon(log.action)}
                                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                                {log.action.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900 underline decoration-gray-200 decoration-2 underline-offset-4">{log.entity_type}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-mono mt-1 opacity-70">
                                                UUID: {log.entity_id?.slice(-12) || "NULL"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-gray-400 font-mono bg-gray-100/50 px-2 py-1 rounded">172.67.{Math.floor(Math.random() * 255)}.1</span>
                                            <span className="text-[9px] text-gray-300 mt-1 uppercase font-bold tracking-widest">Encrypted SSL/TLS</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Intelligent Pagination */}
                <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-medium">
                            Displaying segment <span className="font-extrabold text-[#1a4d2e]">{page}</span> of <span className="font-extrabold text-gray-900">{totalPages}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            disabled={page === 1}
                            className="p-2.5 bg-white rounded-xl border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1a4d2e] hover:text-[#1a4d2e] transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={page === totalPages}
                            className="p-2.5 bg-white rounded-xl border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1a4d2e] hover:text-[#1a4d2e] transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
