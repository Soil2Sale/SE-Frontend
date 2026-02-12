"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRole } from "../services/apiClient";
import { NAV_LINKS } from "@/app/constants/nav-links";
import { Sprout, LogOut } from "lucide-react";

const navLinks = NAV_LINKS[getRole() || "Farmer"];
export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#1a4d2e] to-[#0d2818] flex flex-col text-white sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#4ade80] rounded-lg flex items-center justify-center">
          <Sprout className="w-6 h-6 text-[#0d2818]" />
        </div>
        <span className="text-xl font-bold">Soil2Sale</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#4ade80] text-[#0d2818] font-semibold shadow-lg"
                  : "text-gray-300 hover:bg-[#ffffff15] hover:text-white"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#ffffff15] hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>LOG OUT</span>
        </button>
      </div>
    </div>
  );
}
