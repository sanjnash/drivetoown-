// Stage 2+ — regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          city: string | null;
          car_interest: string | null;
          message: string | null;
          status: 'new' | 'contacted' | 'converted' | 'rejected';
          source: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
    };
  };
}
