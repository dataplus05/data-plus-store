"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "he" | "ar";

type LanguageContextType = {
  language: Language;
  isHebrew: boolean;
  isArabic: boolean;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
};

export default function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("he");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("data-plus-language");

    if (savedLanguage === "he" || savedLanguage === "ar") {
      setLanguageState(savedLanguage);
    } else {
      setLanguageState("he");
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir = "rtl";
    localStorage.setItem("data-plus-language", language);
  }, [language, isReady]);

  function setLanguage(newLanguage: Language) {
    setLanguageState(newLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      isHebrew: language === "he",
      isArabic: language === "ar",
      setLanguage,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}