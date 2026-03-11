"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  FarmerLang,
  FarmerT,
  farmerTranslations,
} from "@/app/constants/farmerTranslations";

const STORAGE_KEY = "farmerLang";
const DEFAULT_LANG: FarmerLang = "en";

interface FarmerLanguageContextValue {
  lang: FarmerLang;
  setLang: (lang: FarmerLang) => void;
  t: FarmerT;
}

const FarmerLanguageContext = createContext<FarmerLanguageContextValue | null>(
  null,
);

export function FarmerLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<FarmerLang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as FarmerLang | null;
    if (stored && stored in farmerTranslations) {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: FarmerLang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const t = useMemo(() => farmerTranslations[lang], [lang]);

  return (
    <FarmerLanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </FarmerLanguageContext.Provider>
  );
}

export function useFarmerLang(): FarmerLanguageContextValue {
  const ctx = useContext(FarmerLanguageContext);
  if (!ctx) {
    throw new Error("useFarmerLang must be used inside FarmerLanguageProvider");
  }
  return ctx;
}
