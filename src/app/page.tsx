"use client";

import { useState } from "react";
import { NavRail, type Tab } from "@/components/layout/NavRail";
import { Topbar } from "@/components/layout/Topbar";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { ResumePreview } from "@/components/builder/ResumePreview";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TemplatesView } from "@/components/dashboard/TemplatesView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { ResumeSync } from "@/components/ResumeSync";

export default function Home() {
  const [tab, setTab] = useState<Tab>("builder");

  return (
    <div className="flex h-dvh flex-col">
      <ResumeSync />
      <Topbar />
      <div className="flex min-h-0 flex-1">
        <NavRail active={tab} onChange={setTab} />

        <main className="chrome-scroll no-print min-h-0 flex-1 overflow-y-auto">
          {tab === "dashboard" && (
            <div className="px-5 py-8 sm:px-10">
              <DashboardView onNavigate={setTab} />
            </div>
          )}

          {tab === "builder" && (
            <div className="grid min-h-full grid-cols-1 lg:grid-cols-[420px_1fr]">
              <div className="no-print border-e border-line bg-paper px-4 py-5 sm:px-5">
                <BuilderCanvas />
              </div>
              <div className="bg-[#EDEAE1] px-5 py-8 sm:px-10">
                <ResumePreview />
              </div>
            </div>
          )}

          {tab === "templates" && (
            <div className="px-5 py-8 sm:px-10">
              <TemplatesView />
            </div>
          )}

          {tab === "settings" && (
            <div className="px-5 py-8 sm:px-10">
              <SettingsView />
            </div>
          )}
        </main>
      </div>

      {/* Print-only surface: always renders the resume regardless of active tab */}
      <div className="hidden print:block">
        <ResumePreview />
      </div>
    </div>
  );
}
