"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { createClient } from "@/lib/supabase/client";
import { reportActivity } from "@/lib/track";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError(t.auth.passwordMismatch);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message || t.auth.genericError);
      return;
    }

    // Email confirmation is on by default for new Supabase projects.
    if (data.session) {
      reportActivity("register");
      router.push("/");
      router.refresh();
    } else {
      setConfirmSent(true);
    }
  }

  if (confirmSent) {
    return <p className="text-[13.5px] text-ink-soft">{t.auth.checkEmail}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <Field label={t.auth.email}>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label={t.auth.password}>
        <Input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <Field label={t.auth.confirmPassword}>
        <Input
          type="password"
          required
          minLength={6}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </Field>

      {error && <p className="text-[12.5px] text-red-600">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full justify-center"
      >
        {t.auth.register}
      </Button>

      <p className="pt-1 text-center text-[12.5px] text-ink-soft">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="font-medium text-ink underline">
          {t.auth.signIn}
        </Link>
      </p>
    </form>
  );
}
