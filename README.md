# Atelier CV — Drag & Drop Resume Dashboard

A Next.js resume-builder dashboard with a live preview, drag-and-drop section
reordering, customizable themes, and full support for **English, Persian
(فارسی) and Pashto (پښتو)** — including automatic RTL layout.

> **Note on the Next.js version:** at the time this was built, the latest
> publicly published Next.js release was **16.2.11** (App Router, Turbopack).
> Next.js **16.3** had not been published to npm yet, so the project was
> scaffolded on 16.2.11. Once 16.3 is released you can upgrade with:
> `npm install next@16.3`.

## Features

- **Dashboard** — completeness meter and quick shortcuts.
- **Builder** — a form panel (personal info + reorderable sections: summary,
  experience, education, skills, languages, certifications) next to a live,
  print-ready preview. Sections are reordered with drag-and-drop
  (`@dnd-kit`), and each can be hidden/shown independently.
- **Templates** — accent color, font pairing (Modern / Classic / Friendly),
  single-column or two-column layout, and photo toggle.
- **Settings** — language switch, JSON export/import of your resume data,
  reset.
- **Trilingual UI** — English (LTR), Persian and Pashto (RTL), switchable at
  any time from the top bar or Settings. All resume text fields are free-text
  so you can write your resume content in whichever language you choose,
  independent of the UI language.
- **Export** — "Export / Print" uses the browser's native print dialog
  against a print-only stylesheet, producing a clean, selectable-text PDF
  (better for ATS parsing than a flattened image export).
- **Local-first** — everything is stored in `localStorage` via
  `zustand/persist`; nothing is sent to a server.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/                     App Router entry (layout, globals.css, page)
  components/
    layout/                Topbar, NavRail (dashboard navigation)
    dashboard/              Dashboard / Templates / Settings tab views
    builder/                Builder canvas, section editors, live preview
      sections/             One editor component per resume section
    ui/                     Small reusable UI atoms (Button, Input, ...)
    LocaleProvider.tsx      React context for locale/dir/translations
  lib/
    i18n/                   en.ts / fa.ts / ps.ts dictionaries + types
    fonts.ts                next/font loaders (Inter, Lora, Plus Jakarta Sans, Vazirmatn)
  store/
    resumeStore.ts          zustand store: resume content, section order, theme
```

## Notes for customization

- Add a new resume section by extending `SectionId` in `resumeStore.ts`,
  adding an editor under `components/builder/sections/`, wiring it into
  `BuilderCanvas.tsx`'s `editors` map, and rendering it in
  `ResumePreview.tsx`'s `renderSection`. Don't forget translation keys.
- Accent colors, fonts and layout are all theme-driven — see
  `AppearancePanel.tsx` and `ResumePreview.tsx`.
- Vazirmatn was chosen as the Persian/Pashto typeface because it has full
  Perso-Arabic coverage (including Pashto-specific letters) and a proper
  variable weight range, so it reads naturally in both languages.

---

### خلاصه فارسی

این یک داشبورد رزومه‌ساز با Next.js است: بخش‌ها با درگ‌اند‌دراپ قابل جابه‌جایی
هستند، پیش‌نمایش زنده دارد، رنگ/فونت/چیدمان قابل شخصی‌سازی است، و رابط کاربری
به سه زبان انگلیسی، فارسی و پشتو (با راست‌به‌چپ خودکار) در دسترس است. همه
داده‌ها فقط در مرورگر شما ذخیره می‌شود. برای اجرا: `npm install` سپس
`npm run dev`.

## Authentication & Admin (Supabase)

The app now requires sign-in. Everything below is already wired up in the
code — you only need a Supabase project and the SQL migration.

1. Create a free project at https://supabase.com.
2. In the SQL editor, run `supabase/schema.sql` from this repo. It creates:
   - `profiles` — one row per user (`role`: `user` | `admin`), auto-created
     by a trigger on sign-up.
   - `resumes` — each user's resume content (JSON) + theme + locale, synced
     automatically from the Builder (`src/components/ResumeSync.tsx`).
   - `user_activity` — one row per login/register event, with **IP address**,
     best-effort **city/region/country/ISP** (via `ipapi.co`, no key
     required), and **user agent** — written by `src/app/api/track/route.ts`.
   - Row Level Security throughout: users only ever see their own data;
     `role = 'admin'` profiles can additionally read everyone's.
3. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon key (Project Settings → API).
4. `npm run dev`, register an account through the app, then in the SQL
   editor run:
   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```
5. Sign in again (or refresh) and you'll see an **Admin** link in the top
   bar leading to `/admin` — a table of every registered user with their
   email, IP, location, last activity, and a "View resume" button that opens
   a summary + raw JSON of what they've built.

Everything is protected by `src/proxy.ts` (Next's middleware/proxy
convention): signed-out visitors are redirected to `/login`, and `/admin` is
redirected away for non-admins both at the proxy layer and again inside the
page itself.

### Where things live

```
src/
  proxy.ts                       Route protection (redirects, admin gate)
  lib/supabase/                  Browser client, server client, session refresh
  app/
    login/, register/            Auth pages
    auth/callback/                 Email-confirmation redirect handler
    api/track/                    Logs IP + geolocation + user agent
    admin/                        Admin-only dashboard (server component)
  components/
    auth/                        AuthShell, LoginForm, RegisterForm
    admin/AdminDashboard.tsx      Users table + resume detail modal
    ResumeSync.tsx                Loads/saves the resume to Supabase
  hooks/useSupabaseUser.ts        Current user + role, used by the top bar
supabase/schema.sql               Tables, RLS policies, triggers
```

## Copyable / ATS-friendly PDF text

The document fonts (`src/lib/fonts.ts`) are loaded with **explicit static
weights** rather than as variable fonts. This matters: browsers reliably
embed static font instances with a proper text layer when printing to PDF,
but frequently fail to do so for variable fonts — the text looks right but
can't be selected/copied, or copies as garbled characters. If you add a new
font, always pass a `weight` array.

## JSON export / import

Use the "Export JSON" / "Import JSON" buttons (top of the Builder panel, and
in Settings) to save a resume to a `.json` file and load it back later —
either to keep editing, to hand a draft to someone else, or to seed a new
resume programmatically. The file includes all content, section order,
visibility, theme, and locale.
