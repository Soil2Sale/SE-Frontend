"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Language } from "@/app/constants/translations";

interface LanguageSelectorProps {
    currentLang: Language;
    onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
    { code: "en", label: "English (EN)" },
    { code: "hi", label: "Hindi (HI)" },
    { code: "ta", label: "Tamil (TA)" },
    { code: "te", label: "Telugu (TE)" },
    { code: "kn", label: "Kannada (KN)" },
    { code: "ml", label: "Malayalam (ML)" },
    { code: "bn", label: "Bengali (BN)" },
    { code: "mr", label: "Marathi (MR)" },
    { code: "gu", label: "Gujarati (GU)" },
    { code: "pa", label: "Punjabi (PA)" },
    { code: "or", label: "Odia (OR)" },
    { code: "ur", label: "Urdu (UR)" },
];

export default function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (lang: Language) => {
        onLanguageChange(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 h-10 px-3 text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] border border-[#1B5E20]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B5E20] hover:bg-[#A5D6A7]/20 transition-all uppercase tracking-wide"
            >
                <Globe className="h-4 w-4" />
                <span>{currentLang.toUpperCase()}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#111] border border-[#1B5E20]/10 dark:border-[#333] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-[300px] overflow-y-auto py-1">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#E8F5E9] dark:hover:bg-[#1a1a1a] transition-colors flex items-center justify-between group ${currentLang === lang.code ? "bg-[#E8F5E9] dark:bg-[#1a1a1a] text-[#1B5E20] font-bold" : "text-[#263238] dark:text-[#E8F5E9]"
                                    }`}
                            >
                                <span>{lang.label}</span>
                                {currentLang === lang.code && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#1B5E20]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
