import type { SupabaseClient, User } from "@supabase/supabase-js";

import type { Session } from "@supabase/supabase-js";

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient
			supabaseAdmin: SupabaseClient
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
		}


	}
}

export { };