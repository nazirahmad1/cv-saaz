"use client";

import { useLocale } from "@/components/LocaleProvider";
import {
  useResumeStore,
  type SectionId,
  type FontPairing,
  type HeadingStyle,
} from "@/store/resumeStore";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  User,
  Users,
  GraduationCap,
  Briefcase,
  BarChart3,
  Languages as LanguagesIcon,
  Award,
  FileText,
} from "lucide-react";
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
  const references = useResumeStore((s) => s.references);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const hiddenSections = useResumeStore((s) => s.hiddenSections);
  const theme = useResumeStore((s) => s.theme);

  const fonts = getDocFonts(locale, theme.font);
  const visibleOrder = sectionOrder.filter((id) => !hiddenSections.includes(id));
  const isBanner = theme.layout === "banner";
  const isTimeline = theme.layout === "timeline";
  const isSidebarLayout = theme.layout === "sidebar";
  const isProfile = theme.layout === "profile";

  const sectionIcons: Partial<Record<SectionId, typeof User>> = {
    summary: FileText,
    experience: Briefcase,
    education: GraduationCap,
    skills: BarChart3,
    languages: LanguagesIcon,
    certifications: Award,
    references: Users,
  };

  // --- Section heading, styled per theme.headingStyle -----------------------
  function heading(text: string, style: HeadingStyle = theme.headingStyle) {
    const headingFont = {
      fontFamily: fonts.heading,
      fontWeight: fonts.headingWeight,
    };

    if (style === "boxed") {
      return (
        <h2
          className="mb-2.5 inline-block rounded-md px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white"
          style={{ ...headingFont, background: theme.accent }}
        >
          {text}
        </h2>
      );
    }
    if (style === "border") {
      return (
        <h2
          className="mb-2.5 border-s-[3px] ps-2.5 text-[13px] font-bold text-ink"
          style={{ ...headingFont, borderColor: theme.accent }}
        >
          {text}
        </h2>
      );
    }
    if (style === "allcaps") {
      return (
        <h2
          className="mb-2.5 flex items-center gap-2 border-b pb-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-ink"
          style={{ ...headingFont, borderColor: "var(--color-line)" }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: theme.accent }}
          />
          {text}
        </h2>
      );
    }
    // underline (default)
    return (
      <h2
        className="mb-2.5 flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.12em]"
        style={{ ...headingFont, color: theme.accent }}
      >
        <span>{text}</span>
        <span className="h-px flex-1" style={{ background: "var(--color-line)" }} />
      </h2>
    );
  }

  function renderSection(id: SectionId, showHeading = true) {
    switch (id) {
      case "summary":
        return summary ? (
          <section key={id}>
            {showHeading && heading(t.sections.summary)}
            <p className="text-[12.5px] leading-relaxed text-ink-soft">{summary}</p>
          </section>
        ) : null;

      case "experience":
        return experience.length ? (
          <section key={id}>
            {showHeading && heading(t.sections.experience)}
            <div
              className={
                isTimeline
                  ? "space-y-4 border-s-2 ps-4"
                  : "space-y-3.5"
              }
              style={isTimeline ? { borderColor: "var(--color-line)" } : undefined}
            >
              {experience.map((e) => (
                <div key={e.id} className="relative">
                  {isTimeline && (
                    <span
                      className="absolute top-1 h-2.5 w-2.5 rounded-full ring-2 ring-white"
                      style={{ background: theme.accent, insetInlineStart: "-21.5px" }}
                    />
                  )}
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
            </div>
          </section>
        ) : null;

      case "education":
        return education.length ? (
          <section key={id} className="space-y-3">
            {showHeading && heading(t.sections.education)}
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
            {showHeading && heading(t.sections.skills)}
            {isProfile ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {skills.map((sk) => (
                  <div key={sk.id}>
                    <div className="mb-1 flex items-center justify-between text-[11.5px] font-medium text-ink">
                      <span>{sk.name}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${sk.level ?? 75}%`,
                          background: theme.accent,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </section>
        ) : null;

      case "languages":
        return languages.length ? (
          <section key={id} className="space-y-1">
            {showHeading && heading(t.sections.languages)}
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
            {showHeading && heading(t.sections.certifications)}
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

      case "references":
        return references.length ? (
          <section key={id}>
            {showHeading && heading(t.sections.references)}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {references.map((r) => (
                <div key={r.id}>
                  <div className="text-[12.5px] font-medium text-ink">{r.name}</div>
                  {r.relation && (
                    <div className="text-[11.5px] text-ink-faint">{r.relation}</div>
                  )}
                  <div className="text-[11.5px] text-ink-faint">
                    {[r.phone, r.email].filter(Boolean).join(" · ")}
                  </div>
                </div>
              ))}
            </div>
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

  const mainList = visibleOrder.filter((id) => mainSections.includes(id));
  const asideList = visibleOrder.filter((id) => asideSections.includes(id));
  const rowLayout = isSidebarLayout && !isBanner;

  // --- "Profile" layout: dark full-height sidebar + icon-badged headings ---
  if (isProfile) {
    const profileAside: SectionId[] = ["education", "references"];
    const profileAsideList = visibleOrder.filter((id) => profileAside.includes(id));
    const profileMainList = visibleOrder.filter((id) => !profileAside.includes(id));

    const IconBadge = ({
      Icon,
      tone,
    }: {
      Icon: typeof User;
      tone: "dark" | "light";
    }) => (
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{
          background: tone === "dark" ? "white" : theme.accent,
          color: tone === "dark" ? theme.accent : "white",
        }}
      >
        <Icon size={13} />
      </span>
    );

    const headRow = (text: string, Icon: typeof User, tone: "dark" | "light") => (
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className="h-5 w-1 shrink-0 rounded-full"
          style={{ background: theme.accent }}
        />
        <IconBadge Icon={Icon} tone={tone} />
        <h2
          className={`text-[13px] font-bold uppercase tracking-wide ${
            tone === "dark" ? "text-white" : "text-ink"
          }`}
          style={{ fontFamily: fonts.heading, fontWeight: fonts.headingWeight }}
        >
          {text}
        </h2>
      </div>
    );

    return (
      <div
        dir={dir}
        className="print-canvas print-page mx-auto grid w-full max-w-[820px] grid-cols-1 overflow-hidden rounded-[3px] bg-white shadow-[0_1px_2px_rgba(22,32,42,0.06),0_16px_40px_-16px_rgba(22,32,42,0.18)] sm:grid-cols-[240px_1fr]"
        style={{ fontFamily: fonts.body }}
      >
        {/* Dark sidebar */}
        <aside className="bg-[#1B222C] px-6 py-8 text-white/90 sm:py-10">
          {theme.showPhoto && personal.photo && (
            <div className="relative mx-auto mb-6 h-28 w-28 sm:mx-0">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: theme.accent,
                  clipPath: "polygon(0 0, 100% 0, 100% 45%, 45% 100%, 0 100%)",
                }}
              />
              <img
                src={personal.photo}
                alt=""
                className="absolute inset-[6px] rounded-full object-cover ring-4 ring-[#1B222C]"
              />
            </div>
          )}

          {contactItems.length > 0 && (
            <div className="mb-6">
              {headRow(t.sidebar.contactMe, User, "dark")}
              <div className="space-y-2 ps-1">
                {contactItems.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11.5px] text-white/75">
                    <c.icon size={12} className="mt-0.5 shrink-0" />
                    <span className="break-words">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profileAsideList.map((id) => (
            <div key={id} className="mb-6 border-t border-dashed border-white/15 pt-5 first:border-0 first:pt-0">
              {id === "references" && references.length > 0 && (
                <>
                  {headRow(t.sections.references, Users, "dark")}
                  <div className="space-y-3">
                    {references.map((r) => (
                      <div key={r.id} className="text-[11.5px]">
                        <div className="font-semibold text-white">{r.name}</div>
                        {r.relation && <div className="text-white/60">{r.relation}</div>}
                        {r.phone && <div className="text-white/60">{r.phone}</div>}
                        {r.email && <div className="text-white/60">{r.email}</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {id === "education" && education.length > 0 && (
                <>
                  {headRow(t.sections.education, GraduationCap, "dark")}
                  <div className="space-y-3">
                    {education.map((e) => (
                      <div key={e.id} className="text-[11.5px]">
                        <div className="font-semibold text-white">{e.school}</div>
                        <div className="text-white/60">
                          {[e.degree, e.field].filter(Boolean).join(" · ")}
                        </div>
                        <div className="text-white/45">
                          {[e.startDate, e.endDate].filter(Boolean).join(" – ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </aside>

        {/* Main column */}
        <div>
          <div
            className="border-s-4 bg-[#F4F3F0] px-6 py-6 sm:px-10 sm:py-8"
            style={{ borderColor: theme.accent }}
          >
            <h1
              className="text-[22px] font-bold tracking-tight text-ink sm:text-[27px]"
              style={{ fontFamily: fonts.heading, fontWeight: fonts.headingWeight }}
            >
              {personal.fullName || t.placeholders.fullName}
            </h1>
            {personal.jobTitle && (
              <p className="mt-1 text-[13px] font-medium" style={{ color: theme.accent }}>
                {personal.jobTitle}
              </p>
            )}
          </div>

          <div className="space-y-6 px-6 py-6 sm:px-10 sm:py-8">
            {profileMainList.map((id) => {
              const Icon = sectionIcons[id] ?? FileText;
              const body = renderSection(id, false);
              if (!body) return null;
              return (
                <div key={id}>
                  {headRow(t.sections[id], Icon, "light")}
                  <div className="ps-[38px]">{body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={dir}
      className="print-canvas print-page mx-auto w-full max-w-[820px] overflow-hidden rounded-[3px] bg-white shadow-[0_1px_2px_rgba(22,32,42,0.06),0_16px_40px_-16px_rgba(22,32,42,0.18)]"
      style={{ fontFamily: fonts.body }}
    >
      {/* Header */}
      {isBanner ? (
        <header
          className="px-6 py-8 text-center sm:px-12 sm:py-10 sm:text-start"
          style={{ background: theme.accent }}
        >
          <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 sm:flex-row">
            {theme.showPhoto && personal.photo && (
              <img
                src={personal.photo}
                alt=""
                className="h-20 w-20 shrink-0 rounded-xl object-cover ring-2 ring-white/60"
              />
            )}
            <div className="min-w-0 text-white">
              <h1
                className="text-[24px] font-bold tracking-tight sm:text-[28px] lg:text-[30px]"
                style={{ fontFamily: fonts.heading, fontWeight: fonts.headingWeight }}
              >
                {personal.fullName || t.placeholders.fullName}
              </h1>
              {personal.jobTitle && (
                <p className="mt-1 text-[13.5px] font-medium text-white/85">
                  {personal.jobTitle}
                </p>
              )}
              {contactItems.length > 0 && (
                <div className="mt-2.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11.5px] text-white/80 sm:justify-start">
                  {contactItems.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1">
                      <c.icon size={11} />
                      {c.value}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header
          className={`flex flex-col items-center gap-4 px-6 pb-5 pt-6 text-center sm:gap-5 sm:px-10 sm:pt-10 lg:px-12 lg:pt-12 ${
            rowLayout ? "sm:flex-row sm:text-start" : ""
          }`}
          style={{ borderBottom: `2px solid ${theme.accent}` }}
        >
          {theme.showPhoto && personal.photo && (
            <img
              src={personal.photo}
              alt=""
              className="h-20 w-20 shrink-0 rounded-xl object-cover"
            />
          )}
          <div className={rowLayout ? "min-w-0" : "w-full"}>
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
                  rowLayout ? "sm:justify-start" : ""
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
      )}

      {/* Body */}
      <div className="px-6 pb-8 pt-6 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
        {isSidebarLayout ? (
          <div
            className={`grid grid-cols-1 gap-8 ${
              theme.reverseSidebar ? "sm:grid-cols-[2fr_1fr]" : "sm:grid-cols-[1fr_2fr]"
            }`}
          >
            {theme.reverseSidebar ? (
              <>
                <div className="space-y-5">{mainList.map((id) => renderSection(id))}</div>
                <div className="space-y-5">{asideList.map((id) => renderSection(id))}</div>
              </>
            ) : (
              <>
                <div className="space-y-5">{asideList.map((id) => renderSection(id))}</div>
                <div className="space-y-5">{mainList.map((id) => renderSection(id))}</div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-5">{visibleOrder.map((id) => renderSection(id))}</div>
        )}
      </div>
    </div>
  );
}
