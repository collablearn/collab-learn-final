import type { ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { addNoteSchema } from "$lib/schema";


export const load: PageServerLoad = async ({ locals: { supabase, isLogged }, request }) => {


};

export const actions: Actions = {
    addNoteAction: async ({ locals: { supabase, isLogged }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = addNoteSchema.parse(formData);
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};