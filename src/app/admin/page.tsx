import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard, type AdminUserRow } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (myProfile?.role !== "admin") redirect("/");

  const [{ data: profiles }, { data: resumes }, { data: activity }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id, email, role, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("resumes")
        .select("user_id, data, theme, locale, updated_at"),
      supabase
        .from("user_activity")
        .select("user_id, ip, city, region, country, isp, user_agent, event, created_at")
        .order("created_at", { ascending: false }),
    ]);

  const resumeByUser = new Map((resumes ?? []).map((r) => [r.user_id, r]));
  const latestActivityByUser = new Map<string, (typeof activity extends (infer U)[] | null ? U : never)>();
  for (const row of activity ?? []) {
    if (!latestActivityByUser.has(row.user_id)) {
      latestActivityByUser.set(row.user_id, row);
    }
  }

  const rows: AdminUserRow[] = (profiles ?? []).map((p) => {
    const resume = resumeByUser.get(p.id);
    const act = latestActivityByUser.get(p.id);
    return {
      id: p.id,
      email: p.email,
      role: p.role,
      createdAt: p.created_at,
      ip: act?.ip ?? null,
      city: act?.city ?? null,
      region: act?.region ?? null,
      country: act?.country ?? null,
      isp: act?.isp ?? null,
      userAgent: act?.user_agent ?? null,
      lastActivityAt: act?.created_at ?? null,
      resume: resume
        ? {
            data: resume.data as Record<string, unknown>,
            theme: resume.theme as Record<string, unknown>,
            locale: resume.locale as string,
            updatedAt: resume.updated_at as string,
          }
        : null,
    };
  });

  return <AdminDashboard rows={rows} />;
}
