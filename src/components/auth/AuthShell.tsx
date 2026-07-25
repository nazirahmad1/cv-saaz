"use client";

import { FileText } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: "var(--color-accent)" }}
            >
              <FileText size={16} />
            </div>
            <span className="text-[13.5px] font-semibold text-ink">
              {t.app.name}
            </span>
          </div>
          <div className="flex overflow-hidden rounded-lg border border-line">
            {(["en", "fa", "ps"] as Locale[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={`px-2.5 py-1 text-[11.5px] font-medium transition ${
                  locale === l
                    ? "bg-ink text-paper"
                    : "bg-paper-raised text-ink-soft"
                }`}
              >
                {t.locales[l]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-paper-raised p-6 shadow-[0_16px_40px_-24px_rgba(22,32,42,0.25)]">
          <h1 className="text-[19px] font-bold text-ink">{title}</h1>
          <p className="mt-1 text-[13px] text-ink-soft">{subtitle}</p>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
