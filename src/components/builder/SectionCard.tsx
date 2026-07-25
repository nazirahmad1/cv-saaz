"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, Eye, EyeOff, GripVertical } from "lucide-react";
import type { SectionId } from "@/store/resumeStore";

export function SectionCard({
  id,
  title,
  hidden,
  onToggleVisible,
  toggleLabel,
  children,
  defaultOpen = false,
}: {
  id: SectionId;
  title: string;
  hidden: boolean;
  onToggleVisible: () => void;
  toggleLabel: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-2xl border bg-paper-raised transition ${
        isDragging ? "dragging border-accent" : "border-line"
      } ${hidden ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-1 px-2 py-2.5">
        <button
          {...attributes}
          {...listeners}
          className="flex h-7 w-7 shrink-0 cursor-grab items-center justify-center rounded-md text-ink-faint hover:bg-black/[0.04] active:cursor-grabbing"
          aria-label="drag"
        >
          <GripVertical size={15} />
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center gap-2 py-1 text-start"
        >
          <span className="text-[13.5px] font-semibold text-ink">
            {title}
          </span>
          <ChevronDown
            size={14}
            className={`text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <button
          onClick={onToggleVisible}
          title={toggleLabel}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-faint hover:bg-black/[0.04] hover:text-ink"
        >
          {hidden ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-4 py-4">{children}</div>
      )}
    </div>
  );
}
