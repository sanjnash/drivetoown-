// Server Supabase client — use in Server Components and API routes
// Stage 2+: Install @supabase/ssr first
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';
// import type { Database } from '@/types/database';

// export function createClient() {
//   const cookieStore = cookies();
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     { cookies: { getAll() { return cookieStore.getAll() } } }
//   );
// }

// STAGE 1 PLACEHOLDER — uncomment above when Supabase is configured
export const supabaseServer = null;
