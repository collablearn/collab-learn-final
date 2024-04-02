import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import type { UserReference } from "$lib/types";

export const load: LayoutServerLoad = async ({ locals: { supabase, isLogged }, }) => {
    const loginCheck = await isLogged();

    if (!loginCheck) redirect(302, "/");

    return {
        userData: await supabase.from("user_list_tb").select("*").eq("user_id", loginCheck.id).limit(1).single() as PostgrestMaybeSingleResponse<UserReference>
    }

};