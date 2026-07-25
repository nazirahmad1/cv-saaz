"use client";

import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Textarea } from "@/components/ui/Field";

export function SummaryEditor() {
  const { t } = useLocale();
  const summary = useResumeStore((s) => s.summary);
  const setSummary = useResumeStore((s) => s.setSummary);

  return (
    <Textarea
      rows={4}
      value={summary}
      placeholder={t.placeholders.summary}
      onChange={(e) => setSummary(e.target.value)}
    />
  );
}
