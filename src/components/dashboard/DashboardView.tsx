"use client";

import { ArrowUpRight, Briefcase, GraduationCap, Sparkles, Tags } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import type { Tab } from "@/components/layout/NavRail";

export function DashboardView({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const { t } = useLocale();
  const personal = useResumeStore((s) => s.personal);
  const summary = useResumeStore((s) => s.summary);
  const experience = useResumeStore((s) => s.experience);
  const education = useResumeStore((s) => s.education);
  const skills = useResumeStore((s) => s.skills);

  const checks = [
    !!personal.fullName,
    !!personal.jobTitle,
    !!personal.email,
    !!summary,
    experience.length > 0,
    education.length > 0,
    skills.length > 0,
  ];
  const completeness = Math.round(
    (checks.filter(Boolean).length / checks.length) * 100
  );

  const stats = [
    { icon: Briefcase, value: experience.length, label: t.sections.experience },
    { icon: GraduationCap, value: education.length, label: t.sections.education },
    { icon: Tags, value: skills.length, label: t.sections.skills },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-ink">{t.app.name}</h1>
        <p className="mt-1 text-[13.5px] text-ink-soft">{t.app.tagline}</p>
      </div>

      <div className="rounded-2xl border border-line bg-paper-raised p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">
            {personal.fullName || t.placeholders.fullName}
          </span>
          <span className="text-[13px] font-semibold" style={{ color: "var(--color-accent)" }}>
            {completeness}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${completeness}%`, background: "var(--color-accent)" }}
          />
        </div>
        <button
          onClick={() => onNavigate("builder")}
          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink hover:opacity-70"
        >
          <Sparkles size={14} />
          {t.nav.builder}
          <ArrowUpRight size={13} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-paper-raised p-4 text-center"
          >
            <s.icon className="mx-auto mb-2 text-ink-faint" size={18} />
            <div className="text-[20px] font-bold text-ink">{s.value}</div>
            <div className="mt-0.5 text-[11px] text-ink-faint">{s.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onNavigate("templates")}
        className="flex w-full items-center justify-between rounded-2xl border border-line bg-paper-raised p-4 text-start transition hover:border-ink/30"
      >
        <div>
          <div className="text-[13px] font-semibold text-ink">{t.nav.templates}</div>
          <div className="mt-0.5 text-[12px] text-ink-faint">
            {t.sidebar.accentColor}, {t.sidebar.fontPairing}, {t.sidebar.layout}
          </div>
        </div>
        <ArrowUpRight size={16} className="text-ink-faint" />
      </button>
    </div>
  );
}
