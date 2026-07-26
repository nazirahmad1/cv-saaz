"use client";

import { Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Field, Input } from "@/components/ui/Field";
import { Button, IconButton } from "@/components/ui/Button";

export function ReferencesEditor() {
  const { t } = useLocale();
  const references = useResumeStore((s) => s.references);
  const addReference = useResumeStore((s) => s.addReference);
  const updateReference = useResumeStore((s) => s.updateReference);
  const removeReference = useResumeStore((s) => s.removeReference);

  return (
    <div className="space-y-3">
      {references.length === 0 && (
        <p className="text-[13px] text-ink-faint">{t.empty.references}</p>
      )}
      {references.map((r, idx) => (
        <div key={r.id} className="rounded-xl border border-line bg-paper p-3.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              #{idx + 1}
            </span>
            <IconButton onClick={() => removeReference(r.id)}>
              <Trash2 size={14} />
            </IconButton>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t.fields.refName}>
              <Input
                value={r.name}
                placeholder={t.placeholders.refName}
                onChange={(e) => updateReference(r.id, { name: e.target.value })}
              />
            </Field>
            <Field label={t.fields.refRelation}>
              <Input
                value={r.relation}
                placeholder={t.placeholders.refRelation}
                onChange={(e) => updateReference(r.id, { relation: e.target.value })}
              />
            </Field>
            <Field label={t.fields.refPhone}>
              <Input
                value={r.phone}
                onChange={(e) => updateReference(r.id, { phone: e.target.value })}
              />
            </Field>
            <Field label={t.fields.refEmail}>
              <Input
                value={r.email}
                onChange={(e) => updateReference(r.id, { email: e.target.value })}
              />
            </Field>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={addReference}>
        <Plus size={14} />
        {t.actions.addReference}
      </Button>
    </div>
  );
}
