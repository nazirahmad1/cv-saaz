import type { FontPairing, HeadingStyle, LayoutMode } from "@/store/resumeStore";

export interface TemplatePreset {
  id: string;
  name: string;
  layout: LayoutMode;
  headingStyle: HeadingStyle;
  accent: string;
  font: FontPairing;
  reverseSidebar?: boolean;
}

// A small, curated palette reused across presets so colors stay cohesive.
const C = {
  brass: "#B98B4E",
  teal: "#3F6659",
  brick: "#8B4A4A",
  indigo: "#4A5FA0",
  plum: "#6B5B95",
  ink: "#16202A",
  forest: "#2F6B4F",
  rosewood: "#A45A6B",
  slate: "#495867",
  amber: "#C77B33",
};

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  { id: "modern-brass", name: "Modern Brass", layout: "classic", headingStyle: "underline", accent: C.brass, font: "modern" },
  { id: "executive-ink", name: "Executive Ink", layout: "classic", headingStyle: "underline", accent: C.ink, font: "classic" },
  { id: "timeline-teal", name: "Timeline Teal", layout: "timeline", headingStyle: "border", accent: C.teal, font: "modern" },
  { id: "banner-indigo", name: "Banner Indigo", layout: "banner", headingStyle: "boxed", accent: C.indigo, font: "modern" },
  { id: "sidebar-brick", name: "Sidebar Brick", layout: "sidebar", headingStyle: "underline", accent: C.brick, font: "classic" },
  { id: "boxed-plum", name: "Boxed Plum", layout: "classic", headingStyle: "boxed", accent: C.plum, font: "friendly" },
  { id: "minimal-ink", name: "Minimal Ink", layout: "classic", headingStyle: "allcaps", accent: C.ink, font: "modern" },
  { id: "creative-banner", name: "Creative Rosewood", layout: "banner", headingStyle: "allcaps", accent: C.rosewood, font: "friendly" },
  { id: "tech-timeline", name: "Tech Timeline", layout: "timeline", headingStyle: "underline", accent: C.indigo, font: "modern" },
  { id: "classic-serif", name: "Classic Serif", layout: "classic", headingStyle: "underline", accent: C.slate, font: "classic" },
  { id: "sidebar-forest", name: "Sidebar Forest", layout: "sidebar", headingStyle: "boxed", accent: C.forest, font: "modern" },
  { id: "border-brass", name: "Border Brass", layout: "classic", headingStyle: "border", accent: C.brass, font: "modern" },
  { id: "banner-teal", name: "Banner Teal", layout: "banner", headingStyle: "underline", accent: C.teal, font: "modern" },
  { id: "friendly-plum", name: "Friendly Plum", layout: "sidebar", headingStyle: "allcaps", accent: C.plum, font: "friendly", reverseSidebar: true },
  { id: "timeline-brick", name: "Timeline Brick", layout: "timeline", headingStyle: "boxed", accent: C.brick, font: "friendly" },
  { id: "corporate-indigo", name: "Corporate Indigo", layout: "sidebar", headingStyle: "underline", accent: C.indigo, font: "classic" },
  { id: "bold-banner-ink", name: "Bold Banner", layout: "banner", headingStyle: "border", accent: C.ink, font: "modern" },
  { id: "rosewood-classic", name: "Rosewood Classic", layout: "classic", headingStyle: "underline", accent: C.rosewood, font: "classic" },
  { id: "timeline-forest", name: "Timeline Forest", layout: "timeline", headingStyle: "underline", accent: C.forest, font: "classic" },
  { id: "sidebar-rosewood", name: "Sidebar Rosewood", layout: "sidebar", headingStyle: "boxed", accent: C.rosewood, font: "friendly" },
  { id: "allcaps-teal", name: "All Caps Teal", layout: "classic", headingStyle: "allcaps", accent: C.teal, font: "modern" },
  { id: "banner-brick", name: "Banner Brick", layout: "banner", headingStyle: "boxed", accent: C.brick, font: "friendly" },
  { id: "border-forest", name: "Sidebar Border Forest", layout: "sidebar", headingStyle: "border", accent: C.forest, font: "modern", reverseSidebar: true },
  { id: "minimal-plum", name: "Minimal Plum", layout: "classic", headingStyle: "border", accent: C.plum, font: "classic" },
  { id: "amber-timeline", name: "Amber Timeline", layout: "timeline", headingStyle: "allcaps", accent: C.amber, font: "friendly" },
  { id: "profile-amber", name: "Profile Amber", layout: "profile", headingStyle: "underline", accent: C.amber, font: "modern" },
  { id: "profile-teal", name: "Profile Teal", layout: "profile", headingStyle: "underline", accent: C.teal, font: "classic" },
  { id: "profile-indigo", name: "Profile Indigo", layout: "profile", headingStyle: "boxed", accent: C.indigo, font: "modern" },
  { id: "profile-brick", name: "Profile Brick", layout: "profile", headingStyle: "underline", accent: C.brick, font: "friendly" },
  { id: "profile-forest", name: "Profile Forest", layout: "profile", headingStyle: "boxed", accent: C.forest, font: "modern" },
];
