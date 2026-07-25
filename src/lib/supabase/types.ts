// Hand-written types mirroring supabase/schema.sql.
// Regenerate with `npx supabase gen types typescript` once the project is
// linked, and this file can be replaced by the generated one.

export type ProfileRole = "user" | "admin";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: ProfileRole;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: ProfileRole;
          created_at?: string;
        };
        Update: Partial<{
          email: string;
          role: ProfileRole;
        }>;
        Relationships: [];
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          data: Record<string, unknown>;
          theme: Record<string, unknown>;
          locale: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          data: Record<string, unknown>;
          theme?: Record<string, unknown>;
          locale?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          data: Record<string, unknown>;
          theme: Record<string, unknown>;
          locale: string;
          updated_at: string;
        }>;
        Relationships: [];
      };
      user_activity: {
        Row: {
          id: string;
          user_id: string;
          ip: string | null;
          city: string | null;
          region: string | null;
          country: string | null;
          isp: string | null;
          user_agent: string | null;
          event: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          ip?: string | null;
          city?: string | null;
          region?: string | null;
          country?: string | null;
          isp?: string | null;
          user_agent?: string | null;
          event?: string;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
