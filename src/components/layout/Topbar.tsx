"use client";

import { Printer, RotateCcw, FileText, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { PrintExportDialog, shouldSkipPrintHint } from "@/components/layout/PrintExportDialog";

export function Topbar() {
  const { t, locale, setLocale } = useLocale();
  const router = useRouter();
  const resetAll = useResumeStore((s) => s.resetAll);
  const fullName = useResumeStore((s) => s.personal.fullName);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const { user, isAdmin } = useSupabaseUser();

  function handleExportClick() {
    if (shouldSkipPrintHint()) {
      window.print();
    } else {
      setPrintDialogOpen(true);
    }
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  // Browsers stamp their own page title + date/time into the printed
  // header/footer. We can't switch that row off from the page itself (it's
  // a "Headers and footers" checkbox in the browser's print dialog), but we
  // can at least make sure the title shown there is clean, not the app's
  // bilingual tab title.
  useEffect(() => {
    const original = document.title;
    function onBeforePrint() {
      document.title = fullName || "Resume";
    }
    function onAfterPrint() {
      document.title = original;
    }
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, [fullName]);

  return (
    <header className="no-print sticky top-0 z-20 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line bg-paper/90 px-3 py-2.5 backdrop-blur sm:px-5 sm:py-3">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ background: "var(--color-accent)" }}
        >
          <FileText size={16} />
        </div>
        <div>
          <div className="text-[13.5px] font-semibold leading-none text-ink">
            {t.app.name}
          </div>
          <div className="mt-1 hidden text-[10.5px] leading-none text-ink-faint sm:block">
            {t.topbar.autosaved}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <div className="flex overflow-hidden rounded-lg border border-line">
          {(["en", "fa", "ps"] as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-2.5 py-1.5 text-[11.5px] font-medium transition sm:px-3 sm:text-[12px] ${
                locale === l
                  ? "bg-ink text-paper"
                  : "bg-paper-raised text-ink-soft hover:text-ink"
              }`}
            >
              {t.locales[l]}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm(t.topbar.resetConfirm)) resetAll();
          }}
        >
          <RotateCcw size={14} />
        </Button>

        <Button variant="primary" size="sm" onClick={handleExportClick}>
          <Printer size={14} />
          <span className="hidden sm:inline">{t.topbar.print}</span>
        </Button>

        {isAdmin && (
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ShieldCheck size={14} />
              <span className="hidden sm:inline">{t.auth.admin}</span>
            </Button>
          </Link>
        )}

        {user && (
          <div className="flex items-center gap-1.5 border-s border-line ps-1.5 sm:ps-2">
            <span className="hidden max-w-[140px] truncate text-[11.5px] text-ink-faint md:inline">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut} title={t.auth.signOut}>
              <LogOut size={14} />
            </Button>
          </div>
        )}
      </div>

      <PrintExportDialog
        open={printDialogOpen}
        onClose={() => setPrintDialogOpen(false)}
      />
    </header>
  );
}
