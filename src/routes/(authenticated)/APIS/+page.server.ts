import { checkGuildPassSchema, createGuildSchema, createGuildSchemaWithPassCode, createProjectSchema, createProjectSchemaWithPassCode, updateInformationSchema, updatePasswordSchema, uploadModuleSchema } from "$lib/schema";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { ZodError } from "zod";

type UserAndGuildObjTypes = {
    user_id: string
    user_photo_link: string
    user_fullname: string
    guild_id: number
    guild_name: string
    guild_host_name: string
    guild_image_url: string
}


export const actions: Actions = {
    //edit profile actions
    updatePersonalInformationAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        const { user } = await safeGetSession();

        if (user) {
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
                }]).eq("user_id", user.id)

                if (updateUserError) return fail(401, { msg: updateUserError.message });
                else return fail(200, { msg: 'Information Updated Successfully.' });

            } catch (error) {
                const zodError = error as ZodError;
                const { fieldErrors } = zodError.flatten();
                return fail(400, { errors: fieldErrors });
            }
        } else return redirect(302, "/");
    },

    uploadProfileAction: async ({ locals: { supabase, safeGetSession }, request }) => {

        const profilePicture = (await request.formData()).get("uploadProfile") as File;

        const { user } = await safeGetSession();

        if (user) {

            const { data: uploadPicture, error: uploadProfileError } = await supabase.storage.from("collab-bucket").upload(user.id, profilePicture, {
                cacheControl: "3600",
                upsert: true
            });

            if (uploadProfileError) return fail(401, { msg: uploadProfileError.message });

            else if (uploadPicture) {
                const { data: { publicUrl } } = supabase.storage.from("collab-bucket").getPublicUrl(uploadPicture.path)

                const { error: updateUserError } = await supabase.from("user_list_tb").update([{
                    user_photo_link: `${publicUrl}?${Math.random()}`
                }]).eq("user_id", user.id);

                if (updateUserError) {
                    //this is alternative atm transaction comming soon
                    await supabase.storage.from("collab-bucket").remove([user.id])
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
    createGuildAction: async ({ locals: { supabase, safeGetSession }, request }) => {

        const { user } = await safeGetSession();

        if (user) {

            const formData = Object.fromEntries(await request.formData());

            if (formData.visibility === "Public") {
                try {
                    const result = createGuildSchema.parse(formData);

                    const { error: insertGuildError } = await supabase.from("created_guild_tb").insert([{
                        user_id: user.id,
                        guild_name: result.guildName,
                        host_name: result.hostName,
                        is_private: false,
                        image_url: "",
                        max_users: Number(result.maxUsers),
                        description: result.description,
                        passcode: "",
                        host_photo: result.hostPhoto
                    }]);

                    if (insertGuildError) return fail(401, { msg: insertGuildError.message });
                    else return fail(200, { msg: "Guild Created" })

                } catch (error) {
                    const zodError = error as ZodError;
                    const { fieldErrors } = zodError.flatten();
                    return fail(400, { errors: fieldErrors });
                }
            } else {
                try {
                    const result = createGuildSchemaWithPassCode.parse(formData);
                    const { error: insertGuildError } = await supabase.from("created_guild_tb").insert([{
                        user_id: user.id,
                        guild_name: result.guildName,
                        host_name: result.hostName,
                        is_private: true,
                        image_url: "",
                        max_users: Number(result.maxUsers),
                        description: result.description,
                        passcode: result.passcode,
                        host_photo: result.hostPhoto
                    }]);

                    if (insertGuildError) return fail(401, { msg: insertGuildError.message });
                    else return fail(200, { msg: "Guild Created" })
                } catch (error) {
                    const zodError = error as ZodError;
                    const { fieldErrors } = zodError.flatten();
                    return fail(400, { errors: fieldErrors });
                }
            }

        } else return redirect(302, "/");

    },

    checkIfJoinedAction: async ({ locals: { supabase, safeGetSession }, request }) => {

        const { user } = await safeGetSession();
        const guildId = (await request.formData()).get("guildId") as string;
        if (user) {

            const { data, error: checkIfJoinedError } = await supabase.rpc("check_if_joined", { client_guild_id: Number(guildId), client_user_id: user.id });
            if (checkIfJoinedError) return fail(401, { msg: checkIfJoinedError.message });
            else if (data) return fail(200, { msg: "Welcome Back." });
            else return fail(400, { msg: "Not joined" });

        } else return redirect(302, "/");
    },

    checkPasswordAction: async ({ locals: { supabase }, request }) => {


        const formData = Object.fromEntries(await request.formData());
        try {
            const result = checkGuildPassSchema.parse(formData);

            const parsedUserAndGuildObj = JSON.parse(result.userAndGuildObj) as UserAndGuildObjTypes


            const { data, error: checkPassError } = await supabase.rpc("check_password", {
                client_user_id: parsedUserAndGuildObj.user_id,
                client_user_photo_link: parsedUserAndGuildObj.user_photo_link,
                client_user_fullname: parsedUserAndGuildObj.user_fullname,
                client_guild_id: parsedUserAndGuildObj.guild_id,
                client_guild_name: parsedUserAndGuildObj.guild_name,
                client_pass_code: result.passcode,
                client_guild_host_name: parsedUserAndGuildObj.guild_host_name,
                client_guild_image_url: parsedUserAndGuildObj.guild_image_url
            });

            if (checkPassError) return fail(401, { msg: checkPassError.message });
            else if (data) return fail(200, { msg: "You have successfully joined this guild." });
            else return fail(401, { msg: "Invalid Password" });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    publicJoinAction: async ({ locals: { supabase }, request }) => {
        const userAndGuildObj = (await request.formData()).get("userAndGuildObj") as string;

        const parsedUserAndGuildObj = await JSON.parse(userAndGuildObj) as UserAndGuildObjTypes;

        const { data, error: checkPassError } = await supabase.rpc("check_password", {
            client_user_id: parsedUserAndGuildObj.user_id,
            client_user_photo_link: parsedUserAndGuildObj.user_photo_link,
            client_user_fullname: parsedUserAndGuildObj.user_fullname,
            client_guild_id: parsedUserAndGuildObj.guild_id,
            client_guild_name: parsedUserAndGuildObj.guild_name,
            client_pass_code: "",
            client_guild_host_name: parsedUserAndGuildObj.guild_host_name,
            client_guild_image_url: parsedUserAndGuildObj.user_photo_link
        });

        if (checkPassError) return fail(401, { msg: checkPassError.message });
        else if (data) return fail(200, { msg: "You have successfully joined this guild." });
        else return fail(401, { msg: "Invalid Password" });
    },

    deleteGuildAction: async ({ locals: { supabase }, request }) => {
        const guildId = (await request.formData()).get("guildId");

        const { error: deleteGuildError } = await supabase.from("created_guild_tb").delete().eq("id", guildId);
        if (deleteGuildError) return fail(401, { msg: deleteGuildError.message });
        else return fail(200, { msg: "Guild Deleted Successfully" });
    },

    //projects route
    createProjectAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const { user } = await safeGetSession();

        if (user) {

            const formData = Object.fromEntries(await request.formData());

            if (formData.visibility === "Public") {
                try {
                    const result = createProjectSchema.parse(formData);

                    const { data, error: insertProjectError } = await supabase.from("created_projects_tb").insert([{
                        user_id: user.id,
                        project_name: result.projectName,
                        max_users: Number(result.maxUsers),
                        description: result.description,
                        passcode: "",
                        host_name: result.description,
                        is_private: false,
                        host_photo: result.hostPhoto
                    }]);

                    if (insertProjectError) return fail(401, { msg: insertProjectError.message });
                    else return fail(200, { msg: "Project Created" });

                } catch (error) {
                    const zodError = error as ZodError;
                    const { fieldErrors } = zodError.flatten();
                    return fail(400, { errors: fieldErrors });
                }
            } else {
                try {
                    const result = createProjectSchemaWithPassCode.parse(formData);
                    console.log(result)
                } catch (error) {
                    const zodError = error as ZodError;
                    const { fieldErrors } = zodError.flatten();
                    return fail(400, { errors: fieldErrors });
                }
            }

        } else return redirect(302, "/");
    },

    ///learning module route
    uploadModuleAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const { user } = await safeGetSession();
            const result = uploadModuleSchema.parse(formData);

            if (user) {
                const { data: uploadModulePath, error: uploadModuleError } = await supabase.storage.from("modules-bucket").upload(`${user.id}/${result.moduleName}`, result.uploadModule, {
                    cacheControl: "3600",
                    upsert: true
                });

                if (uploadModuleError) return fail(401, { msg: uploadModuleError.message });
                else if (uploadModulePath) {
                    const { data: { publicUrl } } = supabase.storage.from("modules-bucket").getPublicUrl(uploadModulePath.path)
                    const { error: insertModuleError } = await supabase.from("created_module_tb").insert([{
                        user_id: user.id,
                        host_name: result.hostName,
                        host_photo: result.hostPhoto,
                        module_link: publicUrl,
                        module_name: result.moduleName,
                        description: result.description,
                        file_name: result.uploadModule.name
                    }]);

                    if (insertModuleError) return fail(401, { msg: insertModuleError.message });
                    else return fail(200, { msg: "Uploaded a module successfully." });
                }

            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    deleteModuleAction: async ({ locals: { supabase, safeGetSession }, request }) => {

        const moduleId = (await request.formData()).get("moduleId") as string;

    }

};