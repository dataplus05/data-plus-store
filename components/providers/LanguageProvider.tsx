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

const LanguageContext =
  createContext<LanguageContextType | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
};

const LANGUAGE_STORAGE_KEY = "data-plus-language";
const DEFAULT_LANGUAGE: Language = "he";

function isSupportedLanguage(
  value: string | null
): value is Language {
  return value === "he" || value === "ar";
}

export default function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] =
    useState<Language>(DEFAULT_LANGUAGE);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    );

    queueMicrotask(() => {
      setLanguageState(
        isSupportedLanguage(savedLanguage)
          ? savedLanguage
          : DEFAULT_LANGUAGE
      );

      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir = "rtl";

    localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language
    );
  }, [language, isReady]);

  function setLanguage(newLanguage: Language) {
    setLanguageState(newLanguage);
  }

  const value = useMemo<LanguageContextType>(
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

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}