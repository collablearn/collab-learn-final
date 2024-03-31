import type { PostgrestResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types'
import type { UserReference } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {

    const session = await getSession();

    return {
        session: await getSession(),
        userData: await supabase.from("user_list_tb").select("*").eq("user_id", session?.user.id).limit(1).single() as PostgrestResponse<UserReference>
    }
}