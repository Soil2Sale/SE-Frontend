"use client";

import { useEffect, useState } from "react";
import { getAllDisputes, getDisputeById, updateDisputeStatus } from "@/services/adminApi";
import {
    AlertCircle,
    MessageSquare,
    User,
    Calendar,
    ChevronRight,
    X,
    CheckCircle2,
    XCircle,
    Info,
    History,
    FileText,
    ExternalLink
} from "lucide-react";
import StatusChip from "@/components/ui/StatusChip";
import { motion, AnimatePresence } from "motion/react";

export default function DisputesPage() {
    const [disputes, setDisputes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDispute, setSelectedDispute] = useState<any>(null);
    const [disputeDetails, setDisputeDetails] = useState<any>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    useEffect(() => {
        fetchDisputes();
    }, []);

    const fetchDisputes = async () => {
        try {
            const resp = await getAllDisputes();
            if (resp.success) {
                setDisputes(resp.data);
            }
        } catch (error) {
            console.error("Error fetching disputes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = async (dispute: any) => {
        setSelectedDispute(dispute);
        setDetailsLoading(true);
        try {
            const resp = await getDisputeById(dispute.id);
            if (resp.success) {
                setDisputeDetails(resp.data);
            }
        } catch (error) {
            console.error("Error fetching dispute details:", error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleAction = async (status: string) => {
        if (!selectedDispute) return;
        try {
            const resp = await updateDisputeStatus(selectedDispute.id, status);
            if (resp.success) {
                // Update local list state
                setDisputes(disputes.map(d => d.id === selectedDispute.id ? { ...d, status } : d));
                // Update local detail state if open
                if (disputeDetails) {
                    setDisputeDetails({
                        ...disputeDetails,
                        dispute: { ...disputeDetails.dispute, status }
                    });
                }
            }
        } catch (error) {
            console.error("Error updating dispute:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1a4d2e]">Disputes Management</h1>
                <p className="text-gray-500 text-sm">Review and resolve platform conflicts</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-gray-100"></div>
                    ))
                ) : disputes.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-gray-200">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No active disputes found.</p>
                    </div>
                ) : disputes.map((dispute) => (
                    <div
                        key={dispute.id}
                        onClick={() => handleRowClick(dispute)}
                        className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#1a4d2e]/30 cursor-pointer transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900 leading-none">Order #{dispute.order_id?.id?.slice(-8) || dispute.order_id?.slice(-8) || "N/A"}</h3>
                                    <StatusChip status={dispute.status} />
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        {dispute.raised_by_user_id?.name || "User"}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(dispute.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400 font-mono">ID: {dispute.id.slice(0, 8)}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#1a4d2e] group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide-over Detail View */}
            <AnimatePresence>
                {selectedDispute && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDispute(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-2xl h-full bg-[#f8faf9] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-[#1a4d2e]">Dispute Intelligence</h2>
                                    <p className="text-xs text-gray-400 font-mono">UUID: {selectedDispute.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedDispute(null)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {detailsLoading ? (
                                    <div className="space-y-6">
                                        <div className="h-32 bg-gray-100 animate-pulse rounded-3xl"></div>
                                        <div className="h-64 bg-gray-100 animate-pulse rounded-3xl"></div>
                                    </div>
                                ) : disputeDetails ? (
                                    <>
                                        {/* Core Info Header */}
                                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-[10px] font-bold text-[#1a4d2e] uppercase tracking-widest bg-[#1a4d2e]/5 px-2 py-1 rounded-md">Status Overview</span>
                                                <StatusChip status={disputeDetails.dispute.status} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Filed By</p>
                                                    <p className="font-bold text-gray-900">{disputeDetails.dispute.raised_by_user_id?.name}</p>
                                                    <p className="text-xs text-gray-500">{disputeDetails.dispute.raised_by_user_id?.email}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{disputeDetails.dispute.raised_by_user_id?.phone_number || "No Phone"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Created At</p>
                                                    <p className="font-bold text-gray-900">{new Date(disputeDetails.dispute.created_at).toLocaleDateString()}</p>
                                                    <p className="text-xs text-gray-500">{new Date(disputeDetails.dispute.created_at).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <MessageSquare className="w-5 h-5 text-[#1a4d2e]" />
                                                <h3 className="font-bold text-gray-900">Incident Description</h3>
                                            </div>
                                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                                <p className="text-gray-700 leading-relaxed italic text-sm">
                                                    "{disputeDetails.dispute.description || "No description provided."}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* Timeline & Evidence */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <History className="w-5 h-5 text-[#1a4d2e]" />
                                                <h3 className="font-bold text-gray-900">Evidence Timeline</h3>
                                            </div>
                                            {disputeDetails.evidence.length === 0 ? (
                                                <div className="bg-white p-8 rounded-3xl border border-dashed border-gray-200 text-center">
                                                    <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                                    <p className="text-sm text-gray-400 font-medium">No evidentiary files or updates submitted.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {disputeDetails.evidence.map((ev: any) => (
                                                        <div key={ev.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 group hover:border-[#1a4d2e]/20 transition-all">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-[#1a4d2e]/10 flex items-center justify-center text-[#1a4d2e]">
                                                                        <User className="w-3 h-3" />
                                                                    </div>
                                                                    <span className="text-xs font-bold text-gray-900">{ev.user_id?.name}</span>
                                                                </div>
                                                                <span className="text-[10px] text-gray-400 font-medium">{new Date(ev.created_at).toLocaleString()}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mb-3 ml-8 leading-snug">{ev.description}</p>
                                                            {ev.file_url && (
                                                                <a
                                                                    href={ev.file_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="ml-8 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-[#1a4d2e]/5 text-[#1a4d2e] rounded-lg text-xs font-bold transition-colors border border-gray-100"
                                                                >
                                                                    <ExternalLink className="w-3 h-3" />
                                                                    View Documentation
                                                                </a>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-20 text-gray-400">
                                        <AlertCircle className="w-10 h-10 mx-auto mb-4" />
                                        <p>Critical error: Could not load dispute intelligence.</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Footer */}
                            {disputeDetails && (
                                <div className="p-6 bg-white border-t border-gray-100 grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleAction("RESOLVED")}
                                        className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1a4d2e] text-white rounded-2xl font-bold shadow-lg shadow-[#1a4d2e]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        Resolve Case
                                    </button>
                                    <button
                                        onClick={() => handleAction("REJECTED")}
                                        className="flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Reject Claim
                                    </button>
                                    <button
                                        onClick={() => handleAction("PENDING")}
                                        className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all col-span-2"
                                    >
                                        <Info className="w-5 h-5" />
                                        Escalate to Review
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
