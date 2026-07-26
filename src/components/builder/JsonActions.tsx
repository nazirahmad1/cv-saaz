"use client";

import { useRef, useState } from "react";
import { Download, Upload, Check, AlertTriangle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/Button";

const REQUIRED_KEYS = [
  "personal",
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "certifications",
  "sectionOrder",
];

function isResumeShape(data: unknown): data is Record<string, unknown> {
  if (!data || typeof data !== "object") return false;
  return REQUIRED_KEYS.every((k) => k in (data as Record<string, unknown>));
}

export function JsonActions({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useLocale();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function exportJson() {
    const s = useResumeStore.getState();
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      locale: s.locale,
      personal: s.personal,
      summary: s.summary,
      experience: s.experience,
      education: s.education,
      skills: s.skills,
      languages: s.languages,
      certifications: s.certifications,
      references: s.references,
      sectionOrder: s.sectionOrder,
      hiddenSections: s.hiddenSections,
      theme: s.theme,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (s.personal.fullName || "resume")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    a.download = `${safeName}.atelier-cv.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!isResumeShape(data)) throw new Error("shape");
        const parsed = data as Record<string, unknown> & {
          locale?: string;
          hiddenSections?: unknown;
        };
        const content = { ...parsed };
        delete content.version;
        delete content.exportedAt;
        useResumeStore.setState({
          ...content,
          locale: (content.locale as "en" | "fa" | "ps") ?? locale,
          hiddenSections: (content.hiddenSections as never[]) ?? [],
        });
        setStatus("ok");
      } catch {
        setStatus("error");
      }
      setTimeout(() => setStatus("idle"), 3000);
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant={compact ? "ghost" : "secondary"} onClick={exportJson}>
        <Download size={14} />
        {t.data.exportJson}
      </Button>
      <Button
        size="sm"
        variant={compact ? "ghost" : "secondary"}
        onClick={() => fileRef.current?.click()}
      >
        <Upload size={14} />
        {t.data.importJson}
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={importJson}
      />
      {status === "ok" && (
        <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-teal">
          <Check size={13} />
          {t.data.importSuccess}
        </span>
      )}
      {status === "error" && (
        <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-red-600">
          <AlertTriangle size={13} />
          {t.data.invalidFile}
        </span>
      )}
    </div>
  );
}
