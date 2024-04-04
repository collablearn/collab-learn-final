import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { addNoteSchema } from "$lib/schema";


/* export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession }, url }) => {

    const { user } = await safeGetSession();

    return {
        guild_notes: await supabase.from("guild_wall_tb").select("*").match({ guild_id: url.search.slice(2), user_id: user?.id }) as PostgrestSingleResponse<GuildWallReference[]>
    }
};
 */

export const actions: Actions = {
    addNoteAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = addNoteSchema.parse(formData);
            const { user } = await safeGetSession();

            if (user) {
                const { error: addNoteError } = await supabase.from("guild_wall_tb").insert([{
                    guild_id: result.guildId,
                    user_id: user?.id,
                    user_fullname: result.userFullname,
                    user_photo_link: result.userPhotoLink,
                    guild_note: result.guildNote
                }]);
                if (addNoteError) return fail(401, { msg: addNoteError.message });
                else {
                    const { data: guildNotes, error: guildNotesError } = await supabase.from('guild_wall_tb').select('*').match({
                        guild_id: result.guildId,
                        user_id: user.id
                    });

                    if (guildNotesError) return fail(401, { msg: guildNotesError.message });
                    else if (guildNotes) return fail(200, { msg: "Note added.", guildNotes });
                }



            }


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};