import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { CreatedGuildReference, UserReference } from "$lib/types";

export const load: LayoutServerLoad = async ({ locals: { supabase, isLogged } }) => {
    const loginCheck = await isLogged();

    if (!loginCheck) return redirect(302, "/");

    return {
        userData: await supabase.from("user_list_tb").select("*").eq("user_id", loginCheck.id).limit(1).single() as PostgrestSingleResponse<UserReference>,
        createdGuilds: await supabase.from("created_guild_tb").select("*") as PostgrestSingleResponse<CreatedGuildReference[]>
    }

};