"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface ProfileInfo {
  role: "user" | "admin";
  email: string;
}

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function load() {
      const {
        data: { user: current },
      } = await supabase.auth.getUser();
      if (!active) return;
      setUser(current);

      if (current) {
        const { data } = await supabase
          .from("profiles")
          .select("role, email")
          .eq("id", current.id)
          .single();
        if (active && data) setProfile(data as ProfileInfo);
      } else {
        setProfile(null);
      }
      if (active) setLoading(false);
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, profile, loading, isAdmin: profile?.role === "admin" };
}
