"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { getDisputeById, addDisputeEvidence } from "@/services/dispute/disputeApi";
import { Dispute, DisputeEvidence } from "@/types/dispute.types";
import StatusChip from "@/components/ui/StatusChip";
import { 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  Calendar, 
  Package, 
  FileText, 
  Plus, 
  Link as LinkIcon 
} from "lucide-react";
import Link from "next/link";

function fmt(d: string | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DisputeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const disputeId = unwrappedParams.id;

  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [evidenceList, setEvidenceList] = useState<DisputeEvidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fileUrl, setFileUrl] = useState("");
  const [evidenceDesc, setEvidenceDesc] = useState("");
  const [submittingEvidence, setSubmittingEvidence] = useState(false);

  const fetchDispute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDisputeById(disputeId);
      setDispute(res.data.dispute);
      setEvidenceList(res.data.evidence || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to load dispute details");
    } finally {
      setLoading(false);
    }
  }, [disputeId]);

  useEffect(() => {
    fetchDispute();
  }, [fetchDispute]);

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) return;
    setSubmittingEvidence(true);
    try {
      await addDisputeEvidence(disputeId, {
        file_url: fileUrl,
        description: evidenceDesc,
      });
      setFileUrl("");
      setEvidenceDesc("");
      await fetchDispute();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || err.message || "Failed to add evidence");
    } finally {
      setSubmittingEvidence(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a4d2e]" />
      </div>
    );
  }

  if (error || !dispute) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-red-100">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Dispute</h2>
        <p className="text-gray-500 mb-6">{error || "Dispute not found"}</p>
        <Link
          href="/farmer/disputes"
          className="inline-flex items-center gap-2 text-[#1a4d2e] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Disputes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/farmer/disputes"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-3">
            Dispute Details
            <StatusChip status={dispute.status} />
          </h1>
          <p className="text-gray-500 text-sm font-mono mt-1">ID: {dispute.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1a4d2e]" />
              Description
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm whitespace-pre-wrap border border-gray-100 min-h-[100px]">
              {dispute.description}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#1a4d2e]" />
              Evidence & Activity
            </h2>

            {evidenceList.length === 0 ? (
              <p className="text-gray-400 text-sm italic py-4">No evidence has been provided yet.</p>
            ) : (
              <div className="space-y-4 mb-8">
                {evidenceList.map((ev) => (
                  <div key={ev.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          Evidence Provided
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {fmt(ev.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {ev.description || "Attached a file."}
                      </p>
                      <a
                        href={ev.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                      >
                        <LinkIcon className="w-4 h-4" />
                        View Attachment
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-md font-bold text-gray-800 mb-4">Add New Evidence</h3>
              <form onSubmit={handleAddEvidence} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    File URL (Image/Document link)
                  </label>
                  <input
                    type="url"
                    required
                    disabled={submittingEvidence}
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea
                    disabled={submittingEvidence}
                    value={evidenceDesc}
                    onChange={(e) => setEvidenceDesc(e.target.value)}
                    placeholder="Describe what this evidence shows..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingEvidence || !fileUrl}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {submittingEvidence && <Loader2 className="w-4 h-4 animate-spin" />}
                    Upload Evidence
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">
              Order Information
            </h2>
            <div className="space-y-4">
              <div>
                <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  <Package className="w-3.5 h-3.5" />
                  Order Ref
                </span>
                <p className="text-sm font-medium text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  {typeof dispute?.order_id === 'string' 
                    ? dispute.order_id 
                    : (typeof dispute?.order_id === 'object' && (dispute?.order_id as any)?.id 
                        ? (dispute.order_id as any).id 
                        : "N/A")}
                </p>
              </div>

              {dispute.order && typeof dispute.order === 'object' && (
                <>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Crop
                    </span>
                    <p className="text-sm font-medium text-gray-900">
                      {dispute.order.crop_name || "Unknown Crop"}
                    </p>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Final Price
                    </span>
                    <p className="text-sm font-bold text-[#1a4d2e]">
                      ₹{(dispute.order.final_price || 0).toLocaleString()}
                    </p>
                  </div>
                </>
              )}

              <div>
                <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Dispute Raised On
                </span>
                <p className="text-sm font-medium text-gray-900">
                  {fmt(dispute.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
