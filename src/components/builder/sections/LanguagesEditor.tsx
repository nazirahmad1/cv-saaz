"use client";

import { Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/Field";
import { Button, IconButton } from "@/components/ui/Button";

export function LanguagesEditor() {
  const { t } = useLocale();
  const languages = useResumeStore((s) => s.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  return (
    <div className="space-y-2.5">
      {languages.length === 0 && (
        <p className="text-[13px] text-ink-faint">{t.empty.languages}</p>
      )}
      {languages.map((lang) => (
        <div
          key={lang.id}
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <Input
            value={lang.name}
            placeholder={t.placeholders.language}
            onChange={(e) =>
              updateLanguage(lang.id, { name: e.target.value })
            }
          />
          <div className="flex items-center gap-2">
            <select
              value={lang.level}
              onChange={(e) =>
                updateLanguage(lang.id, {
                  level: e.target.value as typeof lang.level,
                })
              }
              className="min-w-0 flex-1 rounded-lg border border-line bg-paper-raised px-2 py-2 text-[12.5px] text-ink outline-none focus:border-accent sm:flex-none sm:shrink-0"
            >
              <option value="basic">{t.proficiencyLevels.basic}</option>
              <option value="conversational">
                {t.proficiencyLevels.conversational}
              </option>
              <option value="fluent">{t.proficiencyLevels.fluent}</option>
              <option value="native">{t.proficiencyLevels.native}</option>
            </select>
            <IconButton onClick={() => removeLanguage(lang.id)}>
              <Trash2 size={14} />
            </IconButton>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={() => addLanguage()}>
        <Plus size={14} />
        {t.actions.addLanguage}
      </Button>
    </div>
  );
}
