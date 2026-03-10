"use client";

import { useEffect, useState } from "react";
import {
    getAllUsers,
    getAllDisputes,
    getAllTransactions,
    getAllAuditLogs
} from "@/services/adminApi";
import {
    Users,
    AlertCircle,
    BadgeDollarSign,
    ShieldAlert,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Clock
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import StatusChip from "@/components/ui/StatusChip";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeDisputes: 0,
        totalTransactions: 0,
        pendingVerifications: 0
    });
    const [roleData, setRoleData] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersResp, disputesResp, transResp, logsResp] = await Promise.all([
                    getAllUsers(),
                    getAllDisputes({ limit: 100 }),
                    getAllTransactions({ limit: 1 }),
                    getAllAuditLogs({ limit: 10 })
                ]);

                // Stats Calculation
                const users = usersResp.success ? usersResp.data : [];
                const disputes = disputesResp.success ? disputesResp.data : [];
                const transTotal = transResp.success ? transResp.total : 0;

                setStats({
                    totalUsers: users.length,
                    activeDisputes: disputes.filter((d: any) => d.status !== 'RESOLVED' && d.status !== 'REJECTED').length,
                    totalTransactions: transTotal,
                    pendingVerifications: users.filter((u: any) => !u.is_active).length
                });

                // User Role Distribution
                const roles: any = {};
                users.forEach((u: any) => {
                    roles[u.role] = (roles[u.role] || 0) + 1;
                });
                setRoleData(Object.keys(roles).map(role => ({
                    name: role,
                    value: roles[role]
                })));

                // Mocking some time-series data based on real counts for the BarChart
                setChartData([
                    { name: 'Mon', count: Math.floor(disputes.length * 0.1) },
                    { name: 'Tue', count: Math.floor(disputes.length * 0.2) },
                    { name: 'Wed', count: Math.floor(disputes.length * 0.15) },
                    { name: 'Thu', count: Math.floor(disputes.length * 0.25) },
                    { name: 'Fri', count: Math.floor(disputes.length * 0.3) },
                ]);

                // Recent Activity
                setRecentActivity(logsResp.success ? logsResp.data : []);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const COLORS = ['#1a4d2e', '#4ade80', '#0d2818', '#86efac', '#14532d'];

    const StatCard = ({ title, value, icon: Icon, trend, trendType }: any) => (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-[#1a4d2e]/5 text-[#1a4d2e]">
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trendType === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                        }`}>
                        {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend}
                    </div>
                )}
            </div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a4d2e]">Admin Command Center</h1>
                    <p className="text-gray-500 text-sm">Real-time platform oversight & metrics</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 bg-white p-1 rounded-2xl border border-gray-100">
                    <button className="px-4 py-2 bg-[#1a4d2e] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#1a4d2e]/20">Overview</button>
                    <button className="px-4 py-2 text-gray-400 text-xs font-bold rounded-xl hover:bg-gray-50">Reports</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Network Users" value={stats.totalUsers} icon={Users} trend="12%" trendType="up" />
                <StatCard title="Active Disputes" value={stats.activeDisputes} icon={ShieldAlert} trend="4%" trendType="down" />
                <StatCard title="Total Transactions" value={stats.totalTransactions} icon={BadgeDollarSign} trend="18%" trendType="up" />
                <StatCard title="Pending Verifications" value={stats.pendingVerifications} icon={Clock} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Distribution Chart */}
                <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#1a4d2e]" />
                        User Composition
                    </h3>
                    <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={roleData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {roleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {roleData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dispute pulse Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#1a4d2e]" />
                            Resolution Pulse
                        </h3>
                        <span className="text-[10px] font-bold text-[#1a4d2e] bg-[#1a4d2e]/5 px-2 py-1 rounded-lg">Last 7 Days</span>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#1a4d2e" radius={[10, 10, 10, 10]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#1a4d2e]" />
                        Latest System Events
                    </h3>
                    <button className="text-xs font-bold text-[#1a4d2e] hover:underline">View All Logs</button>
                </div>
                <div className="divide-y divide-gray-50">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="p-6 animate-pulse flex gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                    <div className="h-3 bg-gray-50 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))
                    ) : recentActivity.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">No recent activity detected.</div>
                    ) : recentActivity.map((log) => (
                        <div key={log.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gray-50 items-center justify-center text-gray-400 group-hover:bg-[#1a4d2e]/10 group-hover:text-[#1a4d2e]">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 capitalize">{log.action.replace(/_/g, " ").toLowerCase()}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-gray-400 font-medium">Actor: {log.user_id?.name || "System"}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusChip status={log.status || "completed"} />
                                <div className="hidden sm:block text-right">
                                    <p className="text-[10px] text-gray-400 font-mono">ID: {log.id.slice(-8)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
