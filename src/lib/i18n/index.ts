import en from "./en";
import fa from "./fa";
import ps from "./ps";
import type { Locale, Dictionary } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, fa, ps };

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
  ps: "rtl",
};

export const locales: Locale[] = ["en", "fa", "ps"];

export type { Locale, Dictionary };
