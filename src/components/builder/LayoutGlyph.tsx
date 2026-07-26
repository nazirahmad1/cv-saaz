"use client";

import type { LayoutMode } from "@/store/resumeStore";

export function LayoutGlyph({
  layout,
  accent,
  reverse = false,
}: {
  layout: LayoutMode;
  accent: string;
  reverse?: boolean;
}) {
  const line = "#D8D4C8";
  const ink = "#B7B2A4";

  if (layout === "sidebar") {
    const asideX = reverse ? 27 : 3;
    const mainX = reverse ? 3 : 16;
    return (
      <svg viewBox="0 0 40 28" className="h-7 w-10">
        <rect x="0" y="0" width="40" height="28" rx="2" fill="white" stroke={line} />
        <rect x={asideX} y="4" width="10" height="4" rx="1" fill={accent} opacity="0.7" />
        <rect x={asideX} y="10" width="9" height="1.6" fill={ink} />
        <rect x={asideX} y="13.5" width="7" height="1.6" fill={ink} />
        <rect x={asideX} y="17" width="8" height="1.6" fill={ink} />
        <rect x={mainX} y="4" width="21" height="1.8" fill={ink} />
        <rect x={mainX} y="8" width="18" height="1.4" fill={line} />
        <rect x={mainX} y="11" width="21" height="1.4" fill={line} />
        <rect x={mainX} y="16" width="15" height="1.8" fill={ink} />
        <rect x={mainX} y="20" width="21" height="1.4" fill={line} />
      </svg>
    );
  }

  if (layout === "banner") {
    return (
      <svg viewBox="0 0 40 28" className="h-7 w-10">
        <rect x="0" y="0" width="40" height="28" rx="2" fill="white" stroke={line} />
        <rect x="0" y="0" width="40" height="9" fill={accent} />
        <rect x="4" y="3" width="16" height="1.8" fill="white" opacity="0.95" />
        <rect x="4" y="6" width="10" height="1.3" fill="white" opacity="0.7" />
        <rect x="4" y="13" width="20" height="1.6" fill={ink} />
        <rect x="4" y="17" width="32" height="1.3" fill={line} />
        <rect x="4" y="20" width="28" height="1.3" fill={line} />
        <rect x="4" y="23.5" width="30" height="1.3" fill={line} />
      </svg>
    );
  }

  if (layout === "timeline") {
    return (
      <svg viewBox="0 0 40 28" className="h-7 w-10">
        <rect x="0" y="0" width="40" height="28" rx="2" fill="white" stroke={line} />
        <rect x="4" y="4" width="16" height="1.8" fill={ink} />
        <line x1="7" y1="10" x2="7" y2="25" stroke={line} strokeWidth="1.4" />
        <circle cx="7" cy="12" r="1.6" fill={accent} />
        <rect x="11" y="11" width="22" height="1.5" fill={ink} />
        <rect x="11" y="14" width="18" height="1.2" fill={line} />
        <circle cx="7" cy="19" r="1.6" fill={accent} />
        <rect x="11" y="18" width="20" height="1.5" fill={ink} />
        <rect x="11" y="21" width="16" height="1.2" fill={line} />
      </svg>
    );
  }

  if (layout === "profile") {
    return (
      <svg viewBox="0 0 40 28" className="h-7 w-10">
        <rect x="0" y="0" width="40" height="28" rx="2" fill="white" stroke={line} />
        <rect x="0" y="0" width="14" height="28" fill="#1B222C" />
        <circle cx="7" cy="7" r="3.4" fill={accent} opacity="0.9" />
        <rect x="3" y="13" width="8" height="1.3" fill="white" opacity="0.7" />
        <rect x="3" y="16" width="8" height="1.1" fill="white" opacity="0.4" />
        <rect x="3" y="20" width="8" height="1.3" fill="white" opacity="0.7" />
        <rect x="3" y="23" width="8" height="1.1" fill="white" opacity="0.4" />
        <rect x="18" y="3" width="19" height="6" fill="#F4F3F0" />
        <rect x="18" y="4.5" width="12" height="1.6" fill={ink} />
        <rect x="18" y="12" width="4" height="4" rx="2" fill={accent} />
        <rect x="24" y="13" width="13" height="1.4" fill={line} />
        <rect x="24" y="16" width="10" height="1.2" fill={line} />
        <rect x="18" y="21" width="19" height="1.6" fill={line} />
        <rect x="18" y="24" width="12" height="1.6" fill={accent} opacity="0.7" />
      </svg>
    );
  }

  // classic
  return (
    <svg viewBox="0 0 40 28" className="h-7 w-10">
      <rect x="0" y="0" width="40" height="28" rx="2" fill="white" stroke={line} />
      <rect x="10" y="4" width="20" height="2" rx="0.5" fill={ink} />
      <rect x="14" y="7.5" width="12" height="1.2" fill={accent} opacity="0.8" />
      <rect x="4" y="13" width="32" height="1.4" fill={accent} />
      <rect x="4" y="17" width="26" height="1.3" fill={line} />
      <rect x="4" y="20" width="30" height="1.3" fill={line} />
      <rect x="4" y="23.5" width="20" height="1.3" fill={line} />
    </svg>
  );
}
