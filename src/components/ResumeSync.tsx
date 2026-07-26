"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useResumeStore } from "@/store/resumeStore";

function serializeContent(s: ReturnType<typeof useResumeStore.getState>) {
  return {
    personal: s.personal,
    summary: s.summary,
    experience: s.experience,
    education: s.education,
    skills: s.skills,
    languages: s.languages,
    certifications: s.certifications,
    references: s.references,
    sectionOrder: s.sectionOrder,
    hiddenSections: s.hiddenSections,
  };
}

export function ResumeSync() {
  const hydrated = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let unsub: (() => void) | null = null;

    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: row } = await supabase
        .from("resumes")
        .select("data, theme, locale")
        .eq("user_id", user.id)
        .maybeSingle();

      if (row?.data) {
        useResumeStore.setState({
          ...(row.data as object),
          theme: { ...useResumeStore.getState().theme, ...(row.theme as object) },
          locale: (row.locale as "en" | "fa" | "ps") ?? useResumeStore.getState().locale,
        });
      }
      hydrated.current = true;

      unsub = useResumeStore.subscribe((state) => {
        if (!hydrated.current) return;
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(async () => {
          await supabase.from("resumes").upsert(
            {
              user_id: user.id,
              data: serializeContent(state),
              theme: state.theme as unknown as Record<string, unknown>,
              locale: state.locale,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
        }, 900);
      });
    }

    init();

    return () => {
      if (unsub) unsub();
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  return null;
}
