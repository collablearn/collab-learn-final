import { checkGuildPassSchema, createGuildSchema, createGuildSchemaWithPassCode, updateInformationSchema, updatePasswordSchema } from "$lib/schema";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { ZodError } from "zod";



export const actions: Actions = {
    //edit profile actions
    updatePersonalInformationAction: async ({ locals: { supabase, getSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        const session = await getSession();

        if (session) {
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
        } else return redirect(302, "/");
    },

    uploadProfileAction: async ({ locals: { supabase, getSession }, request }) => {

        const profilePicture = (await request.formData()).get("uploadProfile") as File;

        const session = await getSession();

        if (session) {

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

        } else return redirect(302, "/");

    },

    updatePasswordAction: async ({ locals: { supabase }, request }) => {

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
    },

    //guild route actions
    createGuildAction: async ({ locals: { supabase, getSession }, request }) => {

        const session = await getSession();

        if (session) {

            const formData = Object.fromEntries(await request.formData());

            if (formData.visibility === "Public") {
                try {
                    const result = createGuildSchema.parse(formData);

                    const { error: insertGuildError } = await supabase.from("created_guild_tb").insert([{
                        user_id: session.user.id,
                        guild_name: result.guildName,
                        host_name: result.hostName,
                        is_private: false,
                        image_url: "",
                        max_users: Number(result.maxUsers),
                        description: result.description,
                        passcode: "",
                    }]);

                    if (insertGuildError) return fail(401, { msg: insertGuildError.message });
                    else return fail(200, { msg: "Guild Created" })

                } catch (error) {
                    const zodError = error as ZodError;
                    const { fieldErrors } = zodError.flatten();
                    console.log(fieldErrors)
                    return fail(400, { errors: fieldErrors });
                }
            } else {
                try {
                    const result = createGuildSchemaWithPassCode.parse(formData);
                    const { error: insertGuildError } = await supabase.from("created_guild_tb").insert([{
                        user_id: session.user.id,
                        guild_name: result.guildName,
                        host_name: result.hostName,
                        is_private: true,
                        image_url: "",
                        max_users: Number(result.maxUsers),
                        description: result.description,
                        passcode: result.passcode,
                    }]);

                    if (insertGuildError) return fail(401, { msg: insertGuildError.message });
                    else return fail(200, { msg: "Guild Created" })
                } catch (error) {
                    const zodError = error as ZodError;
                    const { fieldErrors } = zodError.flatten();
                    console.log(fieldErrors)
                    return fail(400, { errors: fieldErrors });
                }
            }

        } else return redirect(302, "/");

    },

    checkIfJoinedAction: async ({ locals: { supabase, getSession }, request }) => {

        const session = await getSession();
        const guildId = (await request.formData()).get("guildId") as string;
        if (session) {

            const { data, error: checkIfJoinedError } = await supabase.rpc("check_if_joined", { client_guild_id: Number(guildId), client_user_id: session.user.id });
            if (checkIfJoinedError) return fail(401, { msg: checkIfJoinedError.message });
            else if (data) return fail(200, { msg: "Welcome Back." });
            else return fail(400, { msg: "Not joined" });

        } else return redirect(302, "/");
    },

    checkPasswordAction: async ({ locals: { supabase }, request }) => {

        type UserAndGuildObjTypes = {
            client_user_id: string
            client_user_photo_link: string
            client_user_fullname: string
            client_guild_id: number
            client_guild_name: string
        }

        const formData = Object.fromEntries(await request.formData());
        try {
            const result = checkGuildPassSchema.parse(formData);

            const userAndGuildObj = JSON.parse(result.userAndGuildObj) as UserAndGuildObjTypes


            const { data, error: checkPassError } = await supabase.rpc("check_password", {
                client_user_id: userAndGuildObj.client_user_id,
                client_user_photo_link: userAndGuildObj.client_user_photo_link,
                client_user_fullname: userAndGuildObj.client_user_fullname,
                client_guild_id: userAndGuildObj.client_guild_id,
                client_guild_name: userAndGuildObj.client_guild_name,
                client_pass_code: result.passcode
            });

            if (checkPassError) return fail(401, { msg: checkPassError.message });
            else if (data) return fail(200, { msg: "You have successfully joined this guild." });
            else return fail(401, { msg: "Invalid Password" });



        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};