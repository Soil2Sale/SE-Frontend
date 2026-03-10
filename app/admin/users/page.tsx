"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/adminApi";
import { User } from "@/types/user.types";
import {
    Search,
    Filter,
    MoreVertical,
    User as UserIcon,
    Mail,
    Phone,
    Calendar,
    ShieldCheck
} from "lucide-react";
import StatusChip from "@/components/ui/StatusChip";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const resp = await getAllUsers();
            if (resp.success) {
                setUsers(resp.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const getRoleColor = (role: string) => {
        const r = role.toLowerCase();
        if (r === "farmer") return "bg-green-100 text-green-700 border-green-200";
        if (r === "buyer") return "bg-blue-100 text-blue-700 border-blue-200";
        if (r === "logistics" || r === "logistics_provider") return "bg-orange-100 text-orange-700 border-orange-200";
        if (r === "admin") return "bg-purple-100 text-purple-700 border-purple-200";
        return "bg-gray-100 text-gray-700 border-gray-200";
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (user.recovery_email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "All" || user.role === roleFilter;

        const userStatus = user.is_active ? "Active" : "Inactive";
        const matchesStatus = statusFilter === "All" || userStatus === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a4d2e]">Users & Roles</h1>
                    <p className="text-gray-500 text-sm">Manage platform users and their access levels</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#1a4d2e]/20 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-40">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 shadow-sm" />
                        <select
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-[#1a4d2e]/20 outline-none cursor-pointer"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="All">All Roles</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Logistics Provider">Logistics</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="relative w-full md:w-40">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 shadow-sm" />
                        <select
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-[#1a4d2e]/20 outline-none cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table/List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                                                    <div className="h-3 w-20 bg-gray-50 rounded"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                        No users found matching your filters.
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#1a4d2e]/10 flex items-center justify-center text-[#1a4d2e]">
                                                <UserIcon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-[10px] text-gray-400 font-mono">ID: {user.id.slice(0, 8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{user.recovery_email || "N/A"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                <span>{user.mobile_number}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusChip status={user.is_active ? "active" : "inactive"} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                            <MoreVertical className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
