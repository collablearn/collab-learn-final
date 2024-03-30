import { loginSchema, registerSchema, updateInformationSchema } from "$lib/schema";
import { fail, type Actions, redirect } from "@sveltejs/kit";

import type { ZodError } from "zod";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { isLogged } }) => {
    const loginCheck = isLogged();

    if (loginCheck === "has auth") redirect(302, "/dashboard");
};

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
    },

    logoutAction: async ({ locals: { supabase } }) => {
        const { error: logoutError } = await supabase.auth.signOut();

        if (logoutError) return fail(401, { msg: logoutError.message });
        else return fail(200, { msg: "Log out success." });
    },

    updatePersonalInformationAction: async ({ locals: { supabase, isLogged, getSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        const checkLogin = isLogged();
        const session = await getSession();

        if (checkLogin === "has auth" && session) {
            try {
                const result = updateInformationSchema.parse(formData);
                const { data, error: uploadProfileError } = await supabase.storage.from("collab-bucket").upload(session.user.id, result.profilePicture, {
                    cacheControl: "3600",
                    upsert: false
                });

                if (uploadProfileError) return fail(401, { msg: uploadProfileError.message });
                else if (data) { }


            } catch (error) {
                const zodError = error as ZodError;
                const { fieldErrors } = zodError.flatten();
                return fail(400, { errors: fieldErrors });
            }
        } else redirect(302, "/");
    },

    uploadProfileAction: async ({ locals: { supabase, isLogged, getSession }, request }) => {

        const profilePicture = (await request.formData()).get("uploadProfile") as File;

        const checkLogin = isLogged();
        const session = await getSession();

        if (checkLogin === "has auth" && session) {

            const { data: uploadPicture, error: uploadProfileError } = await supabase.storage.from("collab-bucket").upload(session.user.id, profilePicture, {
                cacheControl: "3600",
                upsert: true
            });

            if (uploadProfileError) return fail(401, { msg: uploadProfileError.message });
            else if (uploadPicture) {
                const { data: { publicUrl } } = await supabase.storage.from("collab-bucket").getPublicUrl(uploadPicture.path)

                const { data: { user }, error: updateUserError } = await supabase.auth.updateUser({
                    data: {
                        profileLink: publicUrl
                    }
                });

                if (updateUserError) {
                    //this is alternative atm transaction comming soon
                    await supabase.storage.from("collab-bucket").remove([session.user.id])
                    return fail(401, { msg: updateUserError.message });
                } else if (user) return fail(200, { msg: "Upload successfully", user })
            }

        } else redirect(302, "/");

    }
};