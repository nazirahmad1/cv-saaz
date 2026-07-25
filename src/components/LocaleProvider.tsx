"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { dictionaries, localeDir, type Locale, type Dictionary } from "@/lib/i18n";
import { useResumeStore } from "@/store/resumeStore";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useResumeStore((s) => s.locale);
  const setLocale = useResumeStore((s) => s.setLocale);
  const dir = localeDir[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo(
    () => ({ locale, dir, t: dictionaries[locale], setLocale }),
    [locale, dir, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
