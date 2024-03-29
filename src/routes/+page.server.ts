import { loginSchema, registerSchema } from "$lib/schema";
import { fail, type Actions } from "@sveltejs/kit";
import { passwordStrength } from "check-password-strength";
import type { ZodError } from "zod";

export const actions: Actions = {
    loginAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = loginSchema.parse(formData);

            const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password
            });

            if (loginError) return fail(401, { msg: loginError.message });
            else return fail(200, { msg: "Log in success." });
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    registerAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = registerSchema.parse(formData);

            if (result.passwordStrength != "Strong") return fail(401, { msg: "You must choose a strong password." });

            const { data: { user }, error: registerError } = await supabase.auth.signUp({
                email: result.email,
                password: result.password,
                options: {
                    data: {
                        firstname: result.firstName,
                        lastname: result.lastName
                    }
                }
            });

            if (registerError) return fail(401, { msg: registerError.message });
            else if (user) {
                const { error: insertError } = await supabase.from("user_list_tb").insert([{
                    user_id: user.id,
                    user_email: user.email,
                    user_firstname: user.user_metadata.firstname,
                    user_lastname: user.user_metadata.lastname
                }]);

                if (insertError) {
                    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
                    if (deleteUserError) return fail(401, { msg: deleteUserError.message });
                    else return fail(401, { msg: "There is an error try again." });
                } else return fail(200, { msg: "Registered Successfully." });
            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};