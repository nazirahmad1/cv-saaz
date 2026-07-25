"use client";

import { Check, LayoutList, PanelLeft } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore, type FontPairing, type LayoutMode } from "@/store/resumeStore";

const ACCENTS = [
  { hex: "#B98B4E", name: "Brass" },
  { hex: "#3F6659", name: "Teal" },
  { hex: "#8B4A4A", name: "Brick" },
  { hex: "#4A5FA0", name: "Indigo" },
  { hex: "#6B5B95", name: "Plum" },
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

  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2.5 text-[11.5px] font-medium uppercase tracking-wide text-ink-faint">
          {t.sidebar.accentColor}
        </h4>
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
                  theme.accent === a.hex ? a.hex : "transparent",
              }}
            >
              {theme.accent === a.hex && <Check size={14} className="text-white" />}
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
        <h4 className="mb-2.5 text-[11.5px] font-medium uppercase tracking-wide text-ink-faint">
          {t.sidebar.fontPairing}
        </h4>
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
        <h4 className="mb-2.5 text-[11.5px] font-medium uppercase tracking-wide text-ink-faint">
          {t.sidebar.layout}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateTheme({ layout: "classic" as LayoutMode })}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition ${
              theme.layout === "classic"
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper-raised text-ink hover:border-ink/30"
            }`}
          >
            <LayoutList size={16} />
            <span className="text-[10.5px]">{t.sidebar.layoutClassic}</span>
          </button>
          <button
            onClick={() => updateTheme({ layout: "sidebar" as LayoutMode })}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 transition ${
              theme.layout === "sidebar"
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper-raised text-ink hover:border-ink/30"
            }`}
          >
            <PanelLeft size={16} />
            <span className="text-[10.5px]">{t.sidebar.layoutSidebar}</span>
          </button>
        </div>
      </div>

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
  );
}
