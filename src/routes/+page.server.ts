import { loginSchema, registerSchema, updateInformationSchema, updatePasswordSchema } from "$lib/schema";
import { fail, type Actions, redirect } from "@sveltejs/kit";

import type { ZodError } from "zod";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { isLogged, supabase } }) => {
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
            });

            if (registerError) return fail(401, { msg: registerError.message });
            else if (user) {
                const { error: insertError } = await supabase.from("user_list_tb").insert([{
                    user_id: user.id,
                    user_email: user.email,
                    user_fullname: `${result.lastName}, ${result.firstName}`,
                }]);

                if (insertError) {
                    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
                    if (deleteUserError) return fail(401, { msg: deleteUserError.message });
                    else return fail(401, { msg: insertError.message });
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

                const { error: updateUserError } = await supabase.from("user_list_tb").update([{
                    user_fullname: `${result.lastName}, ${result.firstName}`,
                    user_bio: result.bio,
                    user_address: result.address,
                    user_barangay: result.barangay,
                    user_city: result.city,
                    user_religion: result.religion,
                    user_contact: result.contactNumber
                }]).eq("user_id", session.user.id)

                if (updateUserError) return fail(401, { msg: updateUserError.message });
                else return fail(200, { msg: 'Information Updated Successfully.' });


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
                const { data: { publicUrl } } = supabase.storage.from("collab-bucket").getPublicUrl(uploadPicture.path)

                const { error: updateUserError } = await supabase.from("user_list_tb").update([{
                    user_photo_link: `${publicUrl}?${Math.random()}`
                }]).eq("user_id", session.user.id);

                if (updateUserError) {
                    //this is alternative atm transaction comming soon
                    await supabase.storage.from("collab-bucket").remove([session.user.id])
                    return fail(401, { msg: updateUserError.message });
                } else return fail(200, { msg: "Upload successfully" });
            }

        } else redirect(302, "/");

    },

    updatePasswordAction: async ({ locals: { supabase, isLogged, getSession }, request }) => {
        const checkLogin = isLogged();
        const session = await getSession();

        if (checkLogin === "has auth" && session) {
            const formData = Object.fromEntries(await request.formData());

            try {
                const result = updatePasswordSchema.parse(formData);
                if (result.passwordStrength != "Strong") return fail(401, { msg: "You must choose a strong password." });

                const { data: { user }, error: updatePasswordError } = await supabase.auth.updateUser({
                    password: result.newPassword
                });

                if (updatePasswordError) return fail(401, { msg: updatePasswordError.message });
                else if (user) return fail(200, { msg: "Password Successfully Changed." });

            } catch (error) {
                const zodError = error as ZodError;
                const { fieldErrors } = zodError.flatten();
                return fail(400, { errors: fieldErrors });
            }


        } else redirect(302, "/");
    },

    resetPasswordAction: async ({ locals: { supabase, isLogged, getSession }, request }) => {
        const checkLogin = isLogged();
        const session = await getSession();

        if (checkLogin === "has auth" && session) {
            const formData = Object.fromEntries(await request.formData());

            try {

            } catch (error) {
                const zodError = error as ZodError;
                const { fieldErrors } = zodError.flatten();
                return fail(400, { errors: fieldErrors });
            }

        } else redirect(302, "/");
    }
};