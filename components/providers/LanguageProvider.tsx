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

type LanguageContextValue = {
  language: Language;
  isHebrew: boolean;
  isArabic: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

export default function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("he");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      "data-plus-language"
    );

    if (savedLanguage === "he" || savedLanguage === "ar") {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "rtl";

    window.localStorage.setItem("data-plus-language", language);
  }, [language]);

  function setLanguage(newLanguage: Language) {
    setLanguageState(newLanguage);
  }

  function toggleLanguage() {
    setLanguageState((currentLanguage) =>
      currentLanguage === "he" ? "ar" : "he"
    );
  }

  const value = useMemo(
    () => ({
      language,
      isHebrew: language === "he",
      isArabic: language === "ar",
      setLanguage,
      toggleLanguage,
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