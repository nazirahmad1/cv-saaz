import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { LocaleProvider } from "@/components/LocaleProvider";

export const metadata: Metadata = {
  // رفیق، طبق درخواستت این عنوان/توضیح کامنت شد (غیرفعال) — هر وقت خواستی برگردون:
  // title: "Atelier CV — رزومه‌ساز حرفه‌ای | د سي‌وي جوړونکی",
  // description: "A drag-and-drop resume builder in English, Persian and Pashto.",
  title: "Atelier CV",
  description: "Resume builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
