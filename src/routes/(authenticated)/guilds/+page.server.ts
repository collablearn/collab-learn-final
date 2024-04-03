import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, isLogged }, request }) => {
    const checkLogin = await isLogged()

    return {
        createdGuilds: await supabase.from("created_guild_tb").select("*").eq("user_id", checkLogin?.id)
    }
};