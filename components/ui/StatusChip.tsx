import React from "react";

interface StatusChipProps {
  status: string;
  className?: string;
}

const getStatusStyle = (status: string) => {
  const statusLower = status.toLowerCase();

  if (statusLower === "created" || statusLower === "pending") {
    return "bg-gray-500/20 text-gray-300 border-gray-500/50";
  }
  if (statusLower === "dispatched") {
    return "bg-blue-500/20 text-blue-300 border-blue-500/50";
  }
  if (statusLower === "in_transit" || statusLower === "in transit") {
    return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50";
  }
  if (statusLower === "delivered" || statusLower === "completed") {
    return "bg-green-500/20 text-green-300 border-green-500/50";
  }
  if (statusLower === "cancelled" || statusLower === "failed") {
    return "bg-red-500/20 text-red-300 border-red-500/50";
  }
  if (statusLower === "premium") {
    return "bg-purple-500/20 text-purple-300 border-purple-500/50";
  }
  if (statusLower.includes("grade")) {
    return "bg-blue-500/20 text-blue-300 border-blue-500/50";
  }
  if (statusLower === "standard") {
    return "bg-gray-500/20 text-gray-300 border-gray-500/50";
  }

  return "bg-gray-500/20 text-gray-300 border-gray-500/50";
};

const formatStatusText = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function StatusChip({
  status,
  className = "",
}: StatusChipProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(status)} ${className}`}
    >
      {formatStatusText(status)}
    </span>
  );
}
