"use client";

import { Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { TEMPLATE_PRESETS } from "@/lib/templates";
import { LayoutGlyph } from "@/components/builder/LayoutGlyph";

export function TemplateGallery() {
  const { t } = useLocale();
  const theme = useResumeStore((s) => s.theme);
  const updateTheme = useResumeStore((s) => s.updateTheme);

  return (
    <div>
      <h3 className="text-[13.5px] font-semibold text-ink">{t.sidebar.gallery}</h3>
      <p className="mb-3 mt-0.5 text-[11.5px] text-ink-faint">{t.sidebar.galleryHint}</p>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {TEMPLATE_PRESETS.map((preset) => {
          const active =
            theme.layout === preset.layout &&
            theme.headingStyle === preset.headingStyle &&
            theme.accent.toLowerCase() === preset.accent.toLowerCase() &&
            theme.font === preset.font &&
            !!theme.reverseSidebar === !!preset.reverseSidebar;

          return (
            <button
              key={preset.id}
              onClick={() =>
                updateTheme({
                  layout: preset.layout,
                  headingStyle: preset.headingStyle,
                  accent: preset.accent,
                  font: preset.font,
                  reverseSidebar: !!preset.reverseSidebar,
                })
              }
              className={`relative flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition ${
                active
                  ? "border-ink bg-paper"
                  : "border-line bg-paper-raised hover:border-ink/30"
              }`}
            >
              {active && (
                <span className="absolute end-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-white">
                  <Check size={10} />
                </span>
              )}
              <LayoutGlyph
                layout={preset.layout}
                accent={preset.accent}
                reverse={preset.reverseSidebar}
              />
              <span className="text-center text-[10.5px] font-medium leading-tight text-ink">
                {preset.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
