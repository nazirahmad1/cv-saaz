"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/Button";

export function SkillsEditor() {
  const { t } = useLocale();
  const skills = useResumeStore((s) => s.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
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

      <div className="mb-3 space-y-1.5">
        {skills.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-paper px-2.5 py-1.5"
          >
            <Input
              value={s.name}
              onChange={(e) => updateSkill(s.id, { name: e.target.value })}
              className="!border-0 !bg-transparent !px-0 !py-0 font-medium"
            />
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={s.level}
              onChange={(e) => updateSkill(s.id, { level: Number(e.target.value) })}
              className="h-1.5 w-20 shrink-0 accent-[var(--color-accent)] sm:w-28"
              title={t.fields.proficiency}
            />
            <span className="w-8 shrink-0 text-end text-[11px] text-ink-faint">
              {s.level}%
            </span>
            <IconButton onClick={() => removeSkill(s.id)}>
              <Trash2 size={13} />
            </IconButton>
          </div>
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
