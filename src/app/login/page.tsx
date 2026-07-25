"use client";

import { Suspense } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const { t } = useLocale();
  return (
    <AuthShell title={t.auth.welcomeBack} subtitle={t.auth.welcomeBackSubtitle}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
