"use client";

import {
  Check,
  LayoutList,
  PanelLeft,
  GalleryHorizontal,
  GitCommitVertical,
  FlipHorizontal2,
  IdCard,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import {
  useResumeStore,
  type FontPairing,
  type LayoutMode,
  type HeadingStyle,
} from "@/store/resumeStore";
import { TemplateGallery } from "@/components/builder/TemplateGallery";

const ACCENTS = [
  { hex: "#B98B4E", name: "Brass" },
  { hex: "#3F6659", name: "Teal" },
  { hex: "#8B4A4A", name: "Brick" },
  { hex: "#4A5FA0", name: "Indigo" },
  { hex: "#6B5B95", name: "Plum" },
  { hex: "#2F6B4F", name: "Forest" },
  { hex: "#A45A6B", name: "Rosewood" },
  { hex: "#16202A", name: "Ink" },
];

const FONT_PAIRS: { id: FontPairing; sample: string }[] = [
  { id: "modern", sample: "Aa" },
  { id: "classic", sample: "Aa" },
  { id: "friendly", sample: "Aa" },
];

export function AppearancePanel() {
  const { t } = useLocale();
  const theme = useResumeStore((s) => s.theme);
  const updateTheme = useResumeStore((s) => s.updateTheme);

  const LAYOUTS: { id: LayoutMode; icon: typeof LayoutList; label: string }[] = [
    { id: "classic", icon: LayoutList, label: t.sidebar.layoutClassic },
    { id: "sidebar", icon: PanelLeft, label: t.sidebar.layoutSidebar },
    { id: "banner", icon: GalleryHorizontal, label: t.sidebar.layoutBanner },
    { id: "timeline", icon: GitCommitVertical, label: t.sidebar.layoutTimeline },
    { id: "profile", icon: IdCard, label: t.sidebar.layoutProfile },
  ];

  const HEADING_STYLES: { id: HeadingStyle; label: string }[] = [
    { id: "underline", label: t.sidebar.headingUnderline },
    { id: "boxed", label: t.sidebar.headingBoxed },
    { id: "border", label: t.sidebar.headingBorder },
    { id: "allcaps", label: t.sidebar.headingAllcaps },
  ];

  return (
    <div className="space-y-6">
      <TemplateGallery />

      <div className="border-t border-line pt-5">
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          {t.sidebar.customize}
        </h4>

        <div className="space-y-5">
          <div>
            <h5 className="mb-2.5 text-[11.5px] font-medium text-ink-soft">
              {t.sidebar.accentColor}
            </h5>
            <div className="flex flex-wrap gap-2.5">
              {ACCENTS.map((a) => (
                <button
                  key={a.hex}
                  onClick={() => updateTheme({ accent: a.hex })}
                  title={a.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-paper-raised transition"
                  style={{
                    background: a.hex,
                    ["--tw-ring-color" as string]:
                      theme.accent.toLowerCase() === a.hex.toLowerCase() ? a.hex : "transparent",
                  }}
                >
                  {theme.accent.toLowerCase() === a.hex.toLowerCase() && (
                    <Check size={14} className="text-white" />
                  )}
                </button>
              ))}
              <label className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-dashed border-line text-[10px] text-ink-faint">
                +
                <input
                  type="color"
                  value={theme.accent}
                  onChange={(e) => updateTheme({ accent: e.target.value })}
                  className="h-0 w-0 opacity-0"
                />
              </label>
            </div>
          </div>

          <div>
            <h5 className="mb-2.5 text-[11.5px] font-medium text-ink-soft">
              {t.sidebar.fontPairing}
            </h5>
            <div className="grid grid-cols-3 gap-2">
              {FONT_PAIRS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateTheme({ font: f.id })}
                  className={`rounded-xl border px-2 py-3 text-center transition ${
                    theme.font === f.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper-raised text-ink hover:border-ink/30"
                  }`}
                >
                  <div className="text-lg font-semibold">{f.sample}</div>
                  <div className="mt-1 text-[10.5px] capitalize opacity-80">{f.id}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-2.5 text-[11.5px] font-medium text-ink-soft">
              {t.sidebar.layout}
            </h5>
            <div className="grid grid-cols-3 gap-2">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => updateTheme({ layout: l.id })}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition ${
                    theme.layout === l.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper-raised text-ink hover:border-ink/30"
                  }`}
                >
                  <l.icon size={16} />
                  <span className="text-[10.5px]">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-2.5 text-[11.5px] font-medium text-ink-soft">
              {t.sidebar.headingStyle}
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {HEADING_STYLES.map((h) => (
                <button
                  key={h.id}
                  onClick={() => updateTheme({ headingStyle: h.id })}
                  className={`rounded-xl border px-2 py-2.5 text-[11px] font-medium transition ${
                    theme.headingStyle === h.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper-raised text-ink hover:border-ink/30"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {theme.layout === "sidebar" && (
            <label className="flex items-center justify-between rounded-xl border border-line bg-paper-raised px-3.5 py-3">
              <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
                <FlipHorizontal2 size={14} />
                {t.sidebar.mirrorSidebar}
              </span>
              <input
                type="checkbox"
                checked={theme.reverseSidebar}
                onChange={(e) => updateTheme({ reverseSidebar: e.target.checked })}
                className="h-4 w-4 accent-[var(--color-accent)]"
              />
            </label>
          )}

          <label className="flex items-center justify-between rounded-xl border border-line bg-paper-raised px-3.5 py-3">
            <span className="text-[12.5px] font-medium text-ink">{t.sidebar.showPhoto}</span>
            <input
              type="checkbox"
              checked={theme.showPhoto}
              onChange={(e) => updateTheme({ showPhoto: e.target.checked })}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
