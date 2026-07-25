"use client";

import { useLocale } from "@/components/LocaleProvider";
import {
  useResumeStore,
  type SectionId,
  type FontPairing,
} from "@/store/resumeStore";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const asideSections: SectionId[] = ["skills", "languages", "certifications"];
const mainSections: SectionId[] = ["summary", "experience", "education"];

function getDocFonts(locale: Locale, pairing: FontPairing) {
  const rtl = locale !== "en";
  if (rtl) {
    const weight = pairing === "classic" ? 600 : pairing === "friendly" ? 700 : 700;
    return {
      heading: "var(--font-vazirmatn)",
      body: "var(--font-vazirmatn)",
      headingWeight: weight,
    };
  }
  if (pairing === "classic") {
    return { heading: "var(--font-lora)", body: "var(--font-lora)", headingWeight: 600 };
  }
  if (pairing === "friendly") {
    return { heading: "var(--font-jakarta)", body: "var(--font-jakarta)", headingWeight: 700 };
  }
  return { heading: "var(--font-inter)", body: "var(--font-inter)", headingWeight: 700 };
}

export function ResumePreview() {
  const { t, locale, dir } = useLocale();
  const personal = useResumeStore((s) => s.personal);
  const summary = useResumeStore((s) => s.summary);
  const experience = useResumeStore((s) => s.experience);
  const education = useResumeStore((s) => s.education);
  const skills = useResumeStore((s) => s.skills);
  const languages = useResumeStore((s) => s.languages);
  const certifications = useResumeStore((s) => s.certifications);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const hiddenSections = useResumeStore((s) => s.hiddenSections);
  const theme = useResumeStore((s) => s.theme);

  const fonts = getDocFonts(locale, theme.font);
  const visibleOrder = sectionOrder.filter((id) => !hiddenSections.includes(id));

  const heading = (text: string) => (
    <h2
      className="mb-2.5 flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.12em]"
      style={{ fontFamily: fonts.heading, fontWeight: fonts.headingWeight, color: theme.accent }}
    >
      <span>{text}</span>
      <span className="h-px flex-1" style={{ background: "var(--color-line)" }} />
    </h2>
  );

  function renderSection(id: SectionId) {
    switch (id) {
      case "summary":
        return summary ? (
          <section key={id}>
            {heading(t.sections.summary)}
            <p className="text-[12.5px] leading-relaxed text-ink-soft">{summary}</p>
          </section>
        ) : null;
      case "experience":
        return experience.length ? (
          <section key={id} className="space-y-3.5">
            {heading(t.sections.experience)}
            {experience.map((e) => (
              <div key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-[13px] font-semibold text-ink">
                    {e.role || t.placeholders.role}
                    {e.company && (
                      <span className="font-normal text-ink-soft"> · {e.company}</span>
                    )}
                  </span>
                  <span className="text-[11.5px] text-ink-faint">
                    {e.startDate}
                    {(e.startDate || e.endDate || e.current) && " — "}
                    {e.current ? t.fields.present : e.endDate}
                  </span>
                </div>
                {e.location && (
                  <div className="text-[11.5px] text-ink-faint">{e.location}</div>
                )}
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 ps-4 text-[12.5px] leading-relaxed text-ink-soft">
                    {e.bullets.filter(Boolean).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ) : null;
      case "education":
        return education.length ? (
          <section key={id} className="space-y-3">
            {heading(t.sections.education)}
            {education.map((e) => (
              <div key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-[13px] font-semibold text-ink">
                    {e.degree}
                    {e.field && <span className="font-normal text-ink-soft"> · {e.field}</span>}
                  </span>
                  <span className="text-[11.5px] text-ink-faint">
                    {e.startDate}
                    {(e.startDate || e.endDate) && " — "}
                    {e.endDate}
                  </span>
                </div>
                {e.school && <div className="text-[12px] text-ink-soft">{e.school}</div>}
                {e.bullets.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 ps-4 text-[12.5px] leading-relaxed text-ink-soft">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ) : null;
      case "skills":
        return skills.length ? (
          <section key={id}>
            {heading(t.sections.skills)}
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk) => (
                <span
                  key={sk.id}
                  className="rounded-full px-2.5 py-0.5 text-[11.5px] text-ink-soft"
                  style={{ background: "var(--color-accent-soft)" }}
                >
                  {sk.name}
                </span>
              ))}
            </div>
          </section>
        ) : null;
      case "languages":
        return languages.length ? (
          <section key={id} className="space-y-1">
            {heading(t.sections.languages)}
            {languages.map((l) => (
              <div key={l.id} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink">{l.name}</span>
                <span className="text-ink-faint">{t.proficiencyLevels[l.level]}</span>
              </div>
            ))}
          </section>
        ) : null;
      case "certifications":
        return certifications.length ? (
          <section key={id} className="space-y-2">
            {heading(t.sections.certifications)}
            {certifications.map((c) => (
              <div key={c.id}>
                <div className="text-[12.5px] font-medium text-ink">{c.name}</div>
                <div className="text-[11.5px] text-ink-faint">
                  {c.issuer}
                  {c.date && ` · ${c.date}`}
                </div>
              </div>
            ))}
          </section>
        ) : null;
      default:
        return null;
    }
  }

  const contactItems = [
    personal.location && { icon: MapPin, value: personal.location },
    personal.phone && { icon: Phone, value: personal.phone },
    personal.email && { icon: Mail, value: personal.email },
    personal.website && { icon: Globe, value: personal.website },
  ].filter(Boolean) as { icon: typeof Mail; value: string }[];

  const isSidebarLayout = theme.layout === "sidebar";
  const mainList = visibleOrder.filter((id) => mainSections.includes(id));
  const asideList = visibleOrder.filter((id) => asideSections.includes(id));

  return (
    <div
      dir={dir}
      className="print-canvas print-page mx-auto w-full max-w-[820px] rounded-[3px] bg-white p-6 shadow-[0_1px_2px_rgba(22,32,42,0.06),0_16px_40px_-16px_rgba(22,32,42,0.18)] sm:p-10 lg:p-12"
      style={{ fontFamily: fonts.body }}
    >
      {/* Header */}
      <header
        className={`flex flex-col items-center text-center gap-4 sm:gap-5 ${
          isSidebarLayout ? "sm:flex-row sm:text-start" : ""
        } mb-6 pb-5`}
        style={{ borderBottom: `2px solid ${theme.accent}` }}
      >
        {theme.showPhoto && personal.photo && (
          <img
            src={personal.photo}
            alt=""
            className="h-20 w-20 shrink-0 rounded-xl object-cover"
          />
        )}
        <div className={isSidebarLayout ? "min-w-0" : "w-full"}>
          <h1
            className="text-[24px] font-bold tracking-tight text-ink sm:text-[28px] lg:text-[30px]"
            style={{ fontFamily: fonts.heading, fontWeight: fonts.headingWeight }}
          >
            {personal.fullName || t.placeholders.fullName}
          </h1>
          {personal.jobTitle && (
            <p className="mt-1 text-[13.5px] font-medium" style={{ color: theme.accent }}>
              {personal.jobTitle}
            </p>
          )}
          {contactItems.length > 0 && (
            <div
              className={`mt-2.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11.5px] text-ink-faint ${
                isSidebarLayout ? "sm:justify-start" : ""
              }`}
            >
              {contactItems.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-1">
                  <c.icon size={11} />
                  {c.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {isSidebarLayout ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_2fr]">
          <div className="space-y-5">{asideList.map(renderSection)}</div>
          <div className="space-y-5">{mainList.map(renderSection)}</div>
        </div>
      ) : (
        <div className="space-y-5">{visibleOrder.map(renderSection)}</div>
      )}
    </div>
  );
}
