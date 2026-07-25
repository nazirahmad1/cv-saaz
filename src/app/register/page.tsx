"use client";

import { useLocale } from "@/components/LocaleProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const { t } = useLocale();
  return (
    <AuthShell
      title={t.auth.createAccount}
      subtitle={t.auth.createAccountSubtitle}
    >
      <RegisterForm />
    </AuthShell>
  );
}
