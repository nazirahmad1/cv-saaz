"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe2,
  MapPin,
  Monitor,
  ShieldCheck,
  X,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export interface AdminUserRow {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  ip: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  isp: string | null;
  userAgent: string | null;
  lastActivityAt: string | null;
  resume: {
    data: Record<string, unknown>;
    theme: Record<string, unknown>;
    locale: string;
    updatedAt: string;
  } | null;
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString();
}

function locationLabel(row: AdminUserRow) {
  const parts = [row.city, row.region, row.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}

function countFilled(obj: Record<string, unknown>, keys: string[]) {
  return keys.filter((k) => {
    const v = obj[k];
    return typeof v === "string" ? v.trim().length > 0 : Array.isArray(v) ? v.length > 0 : !!v;
  }).length;
}

export function AdminDashboard({ rows }: { rows: AdminUserRow[] }) {
  const { t } = useLocale();
  const [active, setActive] = useState<AdminUserRow | null>(null);

  return (
    <div className="min-h-dvh bg-paper px-4 py-6 sm:px-10 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/"
              className="mb-2 inline-flex items-center gap-1.5 text-[12px] text-ink-faint hover:text-ink"
            >
              <ArrowLeft size={13} />
              Atelier CV
            </Link>
            <h1 className="flex items-center gap-2 text-[20px] font-bold text-ink">
              <ShieldCheck size={20} />
              {t.admin.title}
            </h1>
            <p className="mt-1 text-[13px] text-ink-soft">{t.admin.subtitle}</p>
          </div>
          <div className="rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-center">
            <div className="text-[20px] font-bold text-ink">{rows.length}</div>
            <div className="text-[10.5px] text-ink-faint">{t.admin.users}</div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line bg-paper-raised">
          <table className="w-full min-w-[840px] text-start text-[12.5px]">
            <thead>
              <tr className="border-b border-line text-start text-[11px] uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-3 text-start font-medium">{t.admin.email}</th>
                <th className="px-4 py-3 text-start font-medium">{t.admin.role}</th>
                <th className="px-4 py-3 text-start font-medium">{t.admin.joined}</th>
                <th className="px-4 py-3 text-start font-medium">{t.admin.ip}</th>
                <th className="px-4 py-3 text-start font-medium">{t.admin.location}</th>
                <th className="px-4 py-3 text-start font-medium">{t.admin.lastActivity}</th>
                <th className="px-4 py-3 text-start font-medium">{t.admin.resumes}</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-ink-faint">
                    {t.admin.noUsers}
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{row.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                        row.role === "admin"
                          ? "bg-ink text-paper"
                          : "bg-paper text-ink-soft"
                      }`}
                    >
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(row.createdAt)}</td>
                  <td className="px-4 py-3 text-ink-soft">{row.ip ?? t.admin.notAvailable}</td>
                  <td className="px-4 py-3 text-ink-soft">{locationLabel(row)}</td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(row.lastActivityAt)}</td>
                  <td className="px-4 py-3">
                    {row.resume ? (
                      <button
                        onClick={() => setActive(row)}
                        className="font-medium underline"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {t.admin.viewResume}
                      </button>
                    ) : (
                      <span className="text-ink-faint">{t.admin.notAvailable}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {active && (
        <ResumeDetailModal row={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

function ResumeDetailModal({
  row,
  onClose,
}: {
  row: AdminUserRow;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [showRaw, setShowRaw] = useState(false);
  const resume = row.resume!;
  const data = resume.data as {
    personal?: { fullName?: string; jobTitle?: string; email?: string; location?: string };
    summary?: string;
    experience?: unknown[];
    education?: unknown[];
    skills?: unknown[];
    languages?: unknown[];
    certifications?: unknown[];
  };
  const theme = resume.theme as { accent?: string };

  const filledFields = countFilled(
    (data.personal as Record<string, unknown>) ?? {},
    ["fullName", "jobTitle", "email", "phone", "location", "website"]
  );

  const sectionsUsed = [
    ["summary", !!data.summary],
    ["experience", (data.experience?.length ?? 0) > 0],
    ["education", (data.education?.length ?? 0) > 0],
    ["skills", (data.skills?.length ?? 0) > 0],
    ["languages", (data.languages?.length ?? 0) > 0],
    ["certifications", (data.certifications?.length ?? 0) > 0],
  ].filter(([, v]) => v).length;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-paper-raised p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-ink-faint">
              {t.admin.resumeFor}
            </div>
            <h3 className="text-[16px] font-bold text-ink">
              {data.personal?.fullName || row.email}
            </h3>
            {data.personal?.jobTitle && (
              <p className="text-[12.5px] text-ink-soft">{data.personal.jobTitle}</p>
            )}
          </div>
          <button onClick={onClose} className="text-ink-faint hover:text-ink">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[12.5px]">
          <div className="rounded-xl border border-line p-3">
            <div className="text-ink-faint">{t.admin.fields}</div>
            <div className="font-semibold text-ink">{filledFields} / 6</div>
          </div>
          <div className="rounded-xl border border-line p-3">
            <div className="text-ink-faint">{t.admin.sectionsUsed}</div>
            <div className="font-semibold text-ink">{sectionsUsed} / 6</div>
          </div>
          <div className="rounded-xl border border-line p-3">
            <div className="text-ink-faint">{t.admin.language}</div>
            <div className="font-semibold text-ink">{resume.locale}</div>
          </div>
          <div className="rounded-xl border border-line p-3">
            <div className="flex items-center gap-1.5 text-ink-faint">
              {t.admin.accent}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="h-3.5 w-3.5 rounded-full border border-line"
                style={{ background: theme.accent }}
              />
              <span className="font-mono text-[11px] text-ink">{theme.accent}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 rounded-xl border border-line p-3 text-[12px]">
          <div className="flex items-center gap-1.5 text-ink-soft">
            <Globe2 size={13} /> {t.admin.ip}: <span className="text-ink">{row.ip ?? t.admin.notAvailable}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-soft">
            <MapPin size={13} /> {t.admin.location}:{" "}
            <span className="text-ink">{locationLabel(row)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-soft">
            <Monitor size={13} /> {t.admin.userAgent}:{" "}
            <span className="truncate text-ink">{row.userAgent ?? t.admin.notAvailable}</span>
          </div>
        </div>

        <button
          onClick={() => setShowRaw((v) => !v)}
          className="mt-4 text-[11.5px] font-medium underline text-ink-soft"
        >
          {showRaw ? "JSON −" : "JSON +"}
        </button>
        {showRaw && (
          <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-ink p-3 text-[10.5px] leading-relaxed text-paper">
            {JSON.stringify(resume.data, null, 2)}
          </pre>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg border border-line py-2 text-[12.5px] font-medium text-ink"
        >
          {t.admin.close}
        </button>
      </div>
    </div>
  );
}
