"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Field";

export function SkillsEditor() {
  const { t } = useLocale();
  const skills = useResumeStore((s) => s.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const [draft, setDraft] = useState("");

  function commit() {
    const value = draft.trim();
    if (!value) return;
    addSkill(value);
    setDraft("");
  }

  return (
    <div>
      {skills.length === 0 && (
        <p className="mb-3 text-[13px] text-ink-faint">{t.empty.skills}</p>
      )}
      <div className="mb-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-[12.5px] text-ink"
          >
            {s.name}
            <button
              onClick={() => removeSkill(s.id)}
              className="text-ink-faint hover:text-ink"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder={t.placeholders.skill}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            }
          }}
        />
        <button
          onClick={commit}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-line bg-paper-raised px-3 text-[12.5px] font-medium text-ink hover:border-ink/30"
        >
          <Plus size={14} />
          {t.actions.add}
        </button>
      </div>
    </div>
  );
}
