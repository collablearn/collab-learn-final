import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { addNoteSchema } from "$lib/schema";


export const load: PageServerLoad = async ({ locals: { supabase, isLogged }, request }) => {


};

export const actions: Actions = {
    addNoteAction: async ({ locals: { supabase, getSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = addNoteSchema.parse(formData);
            const session = await getSession();

            if (session) {
                /* const { error: addNoteError } = await supabase.from("guild_wall_tb").insert([{
                    guild_id: result.guildId,
                    user_id: session.user.id,
                    

                }]) */
            }


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};