"use client";

import { RotateCcw } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/Button";
import { JsonActions } from "@/components/builder/JsonActions";
import type { Locale } from "@/lib/i18n";

export function SettingsView() {
  const { t, locale, setLocale } = useLocale();
  const resetAll = useResumeStore((s) => s.resetAll);

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <h1 className="text-[18px] font-bold text-ink">{t.nav.settings}</h1>

      <div className="rounded-2xl border border-line bg-paper-raised p-4">
        <h3 className="mb-3 text-[12.5px] font-semibold text-ink">
          {t.locales.en} / {t.locales.fa} / {t.locales.ps}
        </h3>
        <div className="flex gap-2">
          {(["en", "fa", "ps"] as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition ${
                locale === l
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink-soft hover:border-ink/30"
              }`}
            >
              {t.locales[l]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-paper-raised p-4">
        <h3 className="mb-3 text-[12.5px] font-semibold text-ink">
          {t.data.exportJson} / {t.data.importJson}
        </h3>
        <JsonActions />
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-faint">
          {t.topbar.autosaved} — your resume also stays in this browser
          (localStorage) and, if you&apos;re signed in, in your account.
          Nothing is sent anywhere else.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-paper-raised p-4">
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            if (confirm(t.topbar.resetConfirm)) resetAll();
          }}
        >
          <RotateCcw size={14} />
          {t.topbar.reset}
        </Button>
      </div>
    </div>
  );
}
