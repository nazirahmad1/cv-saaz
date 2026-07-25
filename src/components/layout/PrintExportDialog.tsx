"use client";

import { useState } from "react";
import { X, Printer, Settings2, EyeOff } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const SKIP_KEY = "atelier-cv-skip-print-hint";

export function PrintExportDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, dir } = useLocale();
  const [dontShowAgain, setDontShowAgain] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(SKIP_KEY) === "1"
  );

  if (!open) return null;

  function proceed() {
    if (dontShowAgain) localStorage.setItem(SKIP_KEY, "1");
    else localStorage.removeItem(SKIP_KEY);
    onClose();
    // Give the dialog a tick to unmount before the print dialog steals focus.
    setTimeout(() => window.print(), 50);
  }

  return (
    <div
      dir={dir}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-paper-raised p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: "var(--color-accent)" }}
            >
              <Printer size={15} />
            </div>
            <h3 className="text-[14.5px] font-bold text-ink">
              {t.topbar.printDialogTitle}
            </h3>
          </div>
          <button onClick={onClose} className="text-ink-faint hover:text-ink">
            <X size={16} />
          </button>
        </div>

        <p className="text-[12.5px] leading-relaxed text-ink-soft">
          {t.topbar.printDialogBody}
        </p>

        <div className="mt-3 space-y-2 rounded-xl border border-line bg-paper p-3 text-[12px] text-ink-soft">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-paper">
              1
            </span>
            {t.topbar.printStep1}
          </div>
          <div className="flex items-start gap-2">
            <Settings2 size={14} className="mt-0.5 shrink-0" />
            {t.topbar.printStep2}
          </div>
          <div className="flex items-start gap-2">
            <EyeOff size={14} className="mt-0.5 shrink-0" />
            {t.topbar.printStep3}
          </div>
        </div>

        <label className="mt-3 flex items-center gap-2 text-[12px] text-ink-faint">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="h-3.5 w-3.5 accent-[var(--color-accent)]"
          />
          {t.topbar.printDontShowAgain}
        </label>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-line py-2 text-[12.5px] font-medium text-ink-soft"
          >
            {t.admin.close}
          </button>
          <button
            onClick={proceed}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink py-2 text-[12.5px] font-medium text-paper"
          >
            <Printer size={13} />
            {t.topbar.print}
          </button>
        </div>
      </div>
    </div>
  );
}

export function shouldSkipPrintHint() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SKIP_KEY) === "1";
}
