import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

interface GeoInfo {
  city: string | null;
  region: string | null;
  country: string | null;
  isp: string | null;
}

async function lookupGeo(ip: string | null): Promise<GeoInfo> {
  const empty: GeoInfo = { city: null, region: null, country: null, isp: null };
  if (!ip || ip === "127.0.0.1" || ip.startsWith("::1")) return empty;

  try {
    // Free, no-key IP geolocation lookup. Best-effort only — if it fails or
    // is rate-limited we still record the IP itself.
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { "User-Agent": "atelier-cv" },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return empty;
    const json = await res.json();
    return {
      city: json.city ?? null,
      region: json.region ?? null,
      country: json.country_name ?? null,
      isp: json.org ?? null,
    };
  } catch {
    return empty;
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let event = "login";
  try {
    const body = await request.json();
    if (body?.event === "register" || body?.event === "login") {
      event = body.event;
    }
  } catch {
    // no body / not JSON — default to "login"
  }

  const ip = getClientIp(request);
  const geo = await lookupGeo(ip);
  const userAgent = request.headers.get("user-agent");

  await supabase.from("user_activity").insert({
    user_id: user.id,
    ip,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    isp: geo.isp,
    user_agent: userAgent,
    event,
  });

  return NextResponse.json({ ok: true });
}
