"use client";

import { Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Field, Input } from "@/components/ui/Field";
import { Button, IconButton } from "@/components/ui/Button";

export function CertificationsEditor() {
  const { t } = useLocale();
  const certifications = useResumeStore((s) => s.certifications);
  const addCertification = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);

  return (
    <div className="space-y-3">
      {certifications.length === 0 && (
        <p className="text-[13px] text-ink-faint">{t.empty.certifications}</p>
      )}
      {certifications.map((c, idx) => (
        <div
          key={c.id}
          className="rounded-xl border border-line bg-paper p-3.5"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              #{idx + 1}
            </span>
            <IconButton onClick={() => removeCertification(c.id)}>
              <Trash2 size={14} />
            </IconButton>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t.fields.certName}>
              <Input
                value={c.name}
                placeholder={t.placeholders.certName}
                onChange={(e) =>
                  updateCertification(c.id, { name: e.target.value })
                }
              />
            </Field>
            <Field label={t.fields.certIssuer}>
              <Input
                value={c.issuer}
                placeholder={t.placeholders.certIssuer}
                onChange={(e) =>
                  updateCertification(c.id, { issuer: e.target.value })
                }
              />
            </Field>
            <Field label={t.fields.certDate}>
              <Input
                value={c.date}
                onChange={(e) =>
                  updateCertification(c.id, { date: e.target.value })
                }
              />
            </Field>
          </div>
        </div>
      ))}
      <Button size="sm" onClick={addCertification}>
        <Plus size={14} />
        {t.actions.addCertification}
      </Button>
    </div>
  );
}
