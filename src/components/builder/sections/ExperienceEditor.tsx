"use client";

import { Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button, IconButton } from "@/components/ui/Button";

export function ExperienceEditor() {
  const { t } = useLocale();
  const experience = useResumeStore((s) => s.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  return (
    <div className="space-y-4">
      {experience.length === 0 && (
        <p className="text-[13px] text-ink-faint">{t.empty.experience}</p>
      )}

      {experience.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-xl border border-line bg-paper p-3.5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              #{idx + 1}
            </span>
            <IconButton onClick={() => removeExperience(item.id)}>
              <Trash2 size={14} />
            </IconButton>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t.fields.company}>
              <Input
                value={item.company}
                placeholder={t.placeholders.company}
                onChange={(e) =>
                  updateExperience(item.id, { company: e.target.value })
                }
              />
            </Field>
            <Field label={t.fields.role}>
              <Input
                value={item.role}
                placeholder={t.placeholders.role}
                onChange={(e) =>
                  updateExperience(item.id, { role: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-3">
            <Field label={t.fields.location}>
              <Input
                value={item.location}
                onChange={(e) =>
                  updateExperience(item.id, { location: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label={t.fields.startDate}>
              <Input
                value={item.startDate}
                onChange={(e) =>
                  updateExperience(item.id, { startDate: e.target.value })
                }
              />
            </Field>
            <Field label={t.fields.endDate}>
              <Input
                value={item.current ? t.fields.present : item.endDate}
                disabled={item.current}
                onChange={(e) =>
                  updateExperience(item.id, { endDate: e.target.value })
                }
              />
            </Field>
          </div>

          <label className="mt-2 flex items-center gap-2 text-[12.5px] text-ink-soft">
            <input
              type="checkbox"
              checked={item.current}
              onChange={(e) =>
                updateExperience(item.id, { current: e.target.checked })
              }
              className="h-3.5 w-3.5 accent-[var(--color-accent)]"
            />
            {t.fields.present}
          </label>

          <div className="mt-3">
            <Field label={t.fields.description}>
              <Textarea
                rows={3}
                value={item.bullets.join("\n")}
                onChange={(e) =>
                  updateExperience(item.id, {
                    bullets: e.target.value.split("\n"),
                  })
                }
              />
            </Field>
          </div>
        </div>
      ))}

      <Button size="sm" onClick={addExperience}>
        <Plus size={14} />
        {t.actions.addExperience}
      </Button>
    </div>
  );
}
