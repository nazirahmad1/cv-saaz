"use client";

import { useLocale } from "@/components/LocaleProvider";
import { AppearancePanel } from "@/components/builder/AppearancePanel";
import { ResumePreview } from "@/components/builder/ResumePreview";

export function TemplatesView() {
  const { t } = useLocale();
  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="rounded-2xl border border-line bg-paper-raised p-4">
        <h3 className="mb-4 text-[13.5px] font-semibold text-ink">
          {t.sidebar.appearance}
        </h3>
        <AppearancePanel />
      </div>
      <div className="min-w-0">
        <ResumePreview />
      </div>
    </div>
  );
}
