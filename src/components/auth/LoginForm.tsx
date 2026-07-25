"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { createClient } from "@/lib/supabase/client";
import { reportActivity } from "@/lib/track";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const { t } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message || t.auth.genericError);
      return;
    }

    reportActivity("login");
    router.push(params.get("next") || "/");
    router.refresh();
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      {error && <p className="text-[12.5px] text-red-600">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full justify-center"
      >
        {t.auth.login}
      </Button>

      <p className="pt-1 text-center text-[12.5px] text-ink-soft">
        {t.auth.noAccount}{" "}
        <Link href="/register" className="font-medium text-ink underline">
          {t.auth.createOne}
        </Link>
      </p>
    </form>
  );
}
