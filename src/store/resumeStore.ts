"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n";

export type SectionId =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "certifications"
  | "references";

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: "basic" | "conversational" | "fluent" | "native";
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  photo: string | null;
}

export type FontPairing = "modern" | "classic" | "friendly";
export type LayoutMode = "classic" | "sidebar" | "banner" | "timeline" | "profile";
export type HeadingStyle = "underline" | "boxed" | "border" | "allcaps";

export interface ThemeSettings {
  accent: string;
  font: FontPairing;
  layout: LayoutMode;
  headingStyle: HeadingStyle;
  reverseSidebar: boolean;
  showPhoto: boolean;
}

export interface ResumeState {
  locale: Locale;
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  references: ReferenceItem[];
  sectionOrder: SectionId[];
  hiddenSections: SectionId[];
  theme: ThemeSettings;

  setLocale: (locale: Locale) => void;
  updatePersonal: (patch: Partial<PersonalInfo>) => void;
  setSummary: (value: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  addSkill: (name?: string) => void;
  updateSkill: (id: string, patch: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;

  addLanguage: (name?: string) => void;
  updateLanguage: (id: string, patch: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;

  addReference: () => void;
  updateReference: (id: string, patch: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;

  reorderSections: (order: SectionId[]) => void;
  toggleSectionVisibility: (id: SectionId) => void;

  updateTheme: (patch: Partial<ThemeSettings>) => void;
  resetAll: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const defaultPersonal: PersonalInfo = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  photo: null,
};

const defaultTheme: ThemeSettings = {
  accent: "#B98B4E",
  font: "modern",
  layout: "classic",
  headingStyle: "underline",
  reverseSidebar: false,
  showPhoto: true,
};

const defaultOrder: SectionId[] = [
  "summary",
  "experience",
  "education",
  "skills",
  "languages",
  "certifications",
  "references",
];

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      locale: "en",
      personal: defaultPersonal,
      summary: "",
      experience: [],
      education: [],
      skills: [],
      languages: [],
      certifications: [],
      references: [],
      sectionOrder: defaultOrder,
      hiddenSections: [],
      theme: defaultTheme,

      setLocale: (locale) => set({ locale }),
      updatePersonal: (patch) =>
        set((s) => ({ personal: { ...s.personal, ...patch } })),
      setSummary: (value) => set({ summary: value }),

      addExperience: () =>
        set((s) => ({
          experience: [
            ...s.experience,
            {
              id: uid(),
              company: "",
              role: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              bullets: [""],
            },
          ],
        })),
      updateExperience: (id, patch) =>
        set((s) => ({
          experience: s.experience.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      removeExperience: (id) =>
        set((s) => ({ experience: s.experience.filter((e) => e.id !== id) })),

      addEducation: () =>
        set((s) => ({
          education: [
            ...s.education,
            {
              id: uid(),
              school: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              bullets: [],
            },
          ],
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          education: s.education.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      removeEducation: (id) =>
        set((s) => ({ education: s.education.filter((e) => e.id !== id) })),

      addSkill: (name = "") =>
        set((s) => ({ skills: [...s.skills, { id: uid(), name, level: 75 }] })),
      updateSkill: (id, patch) =>
        set((s) => ({
          skills: s.skills.map((sk) => (sk.id === id ? { ...sk, ...patch } : sk)),
        })),
      removeSkill: (id) =>
        set((s) => ({ skills: s.skills.filter((sk) => sk.id !== id) })),

      addLanguage: (name = "") =>
        set((s) => ({
          languages: [...s.languages, { id: uid(), name, level: "fluent" }],
        })),
      updateLanguage: (id, patch) =>
        set((s) => ({
          languages: s.languages.map((l) =>
            l.id === id ? { ...l, ...patch } : l
          ),
        })),
      removeLanguage: (id) =>
        set((s) => ({ languages: s.languages.filter((l) => l.id !== id) })),

      addCertification: () =>
        set((s) => ({
          certifications: [
            ...s.certifications,
            { id: uid(), name: "", issuer: "", date: "" },
          ],
        })),
      updateCertification: (id, patch) =>
        set((s) => ({
          certifications: s.certifications.map((c) =>
            c.id === id ? { ...c, ...patch } : c
          ),
        })),
      removeCertification: (id) =>
        set((s) => ({
          certifications: s.certifications.filter((c) => c.id !== id),
        })),

      addReference: () =>
        set((s) => ({
          references: [
            ...s.references,
            { id: uid(), name: "", relation: "", phone: "", email: "" },
          ],
        })),
      updateReference: (id, patch) =>
        set((s) => ({
          references: s.references.map((r) =>
            r.id === id ? { ...r, ...patch } : r
          ),
        })),
      removeReference: (id) =>
        set((s) => ({
          references: s.references.filter((r) => r.id !== id),
        })),

      reorderSections: (order) => set({ sectionOrder: order }),
      toggleSectionVisibility: (id) =>
        set((s) => ({
          hiddenSections: s.hiddenSections.includes(id)
            ? s.hiddenSections.filter((h) => h !== id)
            : [...s.hiddenSections, id],
        })),

      updateTheme: (patch) =>
        set((s) => ({ theme: { ...s.theme, ...patch } })),

      resetAll: () =>
        set({
          personal: defaultPersonal,
          summary: "",
          experience: [],
          education: [],
          skills: [],
          languages: [],
          certifications: [],
          references: [],
          sectionOrder: defaultOrder,
          hiddenSections: [],
          theme: defaultTheme,
        }),
    }),
    { name: "atelier-cv-storage" }
  )
);
