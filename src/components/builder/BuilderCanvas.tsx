"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useLocale } from "@/components/LocaleProvider";
import { useResumeStore, type SectionId } from "@/store/resumeStore";
import { SectionCard } from "@/components/builder/SectionCard";
import { PersonalEditor } from "@/components/builder/PersonalEditor";
import { SummaryEditor } from "@/components/builder/sections/SummaryEditor";
import { ExperienceEditor } from "@/components/builder/sections/ExperienceEditor";
import { EducationEditor } from "@/components/builder/sections/EducationEditor";
import { SkillsEditor } from "@/components/builder/sections/SkillsEditor";
import { LanguagesEditor } from "@/components/builder/sections/LanguagesEditor";
import { CertificationsEditor } from "@/components/builder/sections/CertificationsEditor";
import { ReferencesEditor } from "@/components/builder/sections/ReferencesEditor";
import { JsonActions } from "@/components/builder/JsonActions";
import { GripVertical } from "lucide-react";

const editors: Record<SectionId, React.ComponentType> = {
  summary: SummaryEditor,
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  languages: LanguagesEditor,
  certifications: CertificationsEditor,
  references: ReferencesEditor,
};

export function BuilderCanvas() {
  const { t } = useLocale();
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const hiddenSections = useResumeStore((s) => s.hiddenSections);
  const reorderSections = useResumeStore((s) => s.reorderSections);
  const toggleSectionVisibility = useResumeStore(
    (s) => s.toggleSectionVisibility
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionOrder.indexOf(active.id as SectionId);
    const newIndex = sectionOrder.indexOf(over.id as SectionId);
    reorderSections(arrayMove(sectionOrder, oldIndex, newIndex));
  }

  return (
    <div className="space-y-4">
      <JsonActions />

      <section className="rounded-2xl border border-line bg-paper-raised px-4 py-4">
        <h3 className="mb-3 text-[13.5px] font-semibold text-ink">
          {t.sections.personal}
        </h3>
        <PersonalEditor />
      </section>

      <div className="flex items-center gap-2 px-1 pt-1 text-[11.5px] text-ink-faint">
        <GripVertical size={13} />
        {t.sidebar.dragHint}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sectionOrder.map((id, i) => {
              const Editor = editors[id];
              return (
                <SectionCard
                  key={id}
                  id={id}
                  title={t.sections[id]}
                  hidden={hiddenSections.includes(id)}
                  onToggleVisible={() => toggleSectionVisibility(id)}
                  toggleLabel={t.actions.toggleVisible}
                  defaultOpen={i === 0}
                >
                  <Editor />
                </SectionCard>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
