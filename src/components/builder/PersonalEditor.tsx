"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore } from "@/store/resumeStore";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function PersonalEditor() {
  const { t } = useLocale();
  const personal = useResumeStore((s) => s.personal);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);
  const showPhoto = useResumeStore((s) => s.theme.showPhoto);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updatePersonal({ photo: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      {showPhoto && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-paper">
            {personal.photo ? (
              <img
                src={personal.photo}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink-faint">
                <ImagePlus size={18} />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => fileRef.current?.click()}>
              {t.fields.uploadPhoto}
            </Button>
            {personal.photo && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => updatePersonal({ photo: null })}
              >
                <X size={14} />
              </Button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label={t.fields.fullName}>
          <Input
            value={personal.fullName}
            placeholder={t.placeholders.fullName}
            onChange={(e) => updatePersonal({ fullName: e.target.value })}
          />
        </Field>
        <Field label={t.fields.jobTitle}>
          <Input
            value={personal.jobTitle}
            placeholder={t.placeholders.jobTitle}
            onChange={(e) => updatePersonal({ jobTitle: e.target.value })}
          />
        </Field>
        <Field label={t.fields.email}>
          <Input
            value={personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
          />
        </Field>
        <Field label={t.fields.phone}>
          <Input
            value={personal.phone}
            onChange={(e) => updatePersonal({ phone: e.target.value })}
          />
        </Field>
        <Field label={t.fields.location}>
          <Input
            value={personal.location}
            onChange={(e) => updatePersonal({ location: e.target.value })}
          />
        </Field>
        <Field label={t.fields.website}>
          <Input
            value={personal.website}
            onChange={(e) => updatePersonal({ website: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
