import { Inter, Lora, Plus_Jakarta_Sans, Vazirmatn } from "next/font/google";

// IMPORTANT: explicit static `weight` arrays are required here.
// Without them, next/font serves the *variable* instance of each family.
// Browsers embed variable fonts unreliably when printing to PDF — the
// result is text that looks fine but can't be selected/copied, or copies
// as garbled characters. Static weights fix that: the browser's print-to-
// PDF pipeline embeds a normal font with a proper ToUnicode map, so the
// exported PDF has real, selectable, copyable text (and stays ATS-parseable).

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${lora.variable} ${jakarta.variable} ${vazirmatn.variable}`;
