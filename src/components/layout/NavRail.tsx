"use client";

import { LayoutGrid, PenSquare, Palette, Settings } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type Tab = "dashboard" | "builder" | "templates" | "settings";

const items: { id: Tab; icon: typeof LayoutGrid }[] = [
  { id: "dashboard", icon: LayoutGrid },
  { id: "builder", icon: PenSquare },
  { id: "templates", icon: Palette },
  { id: "settings", icon: Settings },
];

export function NavRail({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  const { t } = useLocale();
  const labels: Record<Tab, string> = {
    dashboard: t.nav.dashboard,
    builder: t.nav.builder,
    templates: t.nav.templates,
    settings: t.nav.settings,
  };

  return (
    <nav className="no-print flex shrink-0 flex-col items-center gap-1.5 border-e border-line bg-paper-raised px-2 py-4 sm:w-[76px]">
      {items.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`group flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2.5 transition ${
            active === id
              ? "bg-ink text-paper"
              : "text-ink-faint hover:bg-black/[0.04] hover:text-ink"
          }`}
        >
          <Icon size={18} />
          <span className="hidden text-[9.5px] font-medium leading-none sm:block">
            {labels[id]}
          </span>
        </button>
      ))}
    </nav>
  );
}
