import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { addNoteSchema } from "$lib/schema";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { GuildWallReference } from "$lib/types";


export const load: PageServerLoad = async ({ locals: { supabase, getSession }, url }) => {
    const session = await getSession();

    return {
        guild_notes: await supabase.from("guild_wall_tb").select("*").match({ guild_id: url.search.slice(2), user_id: session?.user.id }) as PostgrestSingleResponse<GuildWallReference[]>
    }

};

export const actions: Actions = {
    addNoteAction: async ({ locals: { supabase, getSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = addNoteSchema.parse(formData);
            const session = await getSession();

            if (session) {
                const { error: addNoteError } = await supabase.from("guild_wall_tb").insert([{
                    guild_id: result.guildId,
                    user_id: session.user.id,
                    user_fullname: result.userFullname,
                    user_photo_link: result.userPhotoLink,
                    guild_note: result.guildNote
                }]);
                if (addNoteError) return fail(401, { msg: addNoteError.message });
                else return fail(200, { msg: "Note added." });
            }


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};