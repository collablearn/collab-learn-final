import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { CreatedGuildReference, CreatedModuleReference, CreatedProjectReference, JoinedGuildReference, JoinedProjectReference, UserReference } from "$lib/types";

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const { user } = await safeGetSession();

    if (!user) return redirect(302, "/");

    return {
        userData: await supabase.from("user_list_tb").select("*").eq("user_id", user.id).limit(1).single() as PostgrestSingleResponse<UserReference>,
        createdGuilds: await supabase.from("created_guild_tb").select("*").order('id', { ascending: false }) as PostgrestSingleResponse<CreatedGuildReference[]>,
        joinedGuilds: await supabase.from("joined_guild_tb").select("*").eq("user_id", user.id).order('id', { ascending: false }) as PostgrestSingleResponse<JoinedGuildReference[]>,
        createdProjects: await supabase.from("created_projects_tb").select("*").order('id', { ascending: false }) as PostgrestSingleResponse<CreatedProjectReference[]>,
        joinedProjects: await supabase.from("joined_project_tb").select("*").order("id", { ascending: false }) as PostgrestSingleResponse<JoinedProjectReference[]>,
        createdModules: await supabase.from("created_module_tb").select("*").order('id', { ascending: false }) as PostgrestSingleResponse<CreatedModuleReference[]>
    }

};