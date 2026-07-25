"use client";

import { Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Button, IconButton } from "@/components/ui/Button";

export function EducationEditor() {
  const { t } = useLocale();
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <div className="space-y-4">
      {education.length === 0 && (
        <p className="text-[13px] text-ink-faint">{t.empty.education}</p>
      )}

      {education.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-xl border border-line bg-paper p-3.5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              #{idx + 1}
            </span>
            <IconButton onClick={() => removeEducation(item.id)}>
              <Trash2 size={14} />
            </IconButton>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t.fields.school}>
              <Input
                value={item.school}
                placeholder={t.placeholders.school}
                onChange={(e) =>
                  updateEducation(item.id, { school: e.target.value })
                }
              />
            </Field>
            <Field label={t.fields.degree}>
              <Input
                value={item.degree}
                placeholder={t.placeholders.degree}
                onChange={(e) =>
                  updateEducation(item.id, { degree: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-3">
            <Field label={t.fields.field}>
              <Input
                value={item.field}
                onChange={(e) =>
                  updateEducation(item.id, { field: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label={t.fields.startDate}>
              <Input
                value={item.startDate}
                onChange={(e) =>
                  updateEducation(item.id, { startDate: e.target.value })
                }
              />
            </Field>
            <Field label={t.fields.endDate}>
              <Input
                value={item.endDate}
                onChange={(e) =>
                  updateEducation(item.id, { endDate: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="mt-3">
            <Field label={t.fields.description}>
              <Textarea
                rows={2}
                value={item.bullets.join("\n")}
                onChange={(e) =>
                  updateEducation(item.id, {
                    bullets: e.target.value.split("\n").filter(Boolean),
                  })
                }
              />
            </Field>
          </div>
        </div>
      ))}

      <Button size="sm" onClick={addEducation}>
        <Plus size={14} />
        {t.actions.addEducation}
      </Button>
    </div>
  );
}
