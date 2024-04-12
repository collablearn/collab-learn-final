import { addCommentSchema, checkGuildPassSchema, checkProjectSchema, createGuildSchema, createProjectSchema, updateInformationSchema, updatePasswordSchema, uploadModuleSchema } from "$lib/schema";
import type { CreatedGuildReference, UserReference } from "$lib/types";
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

type UserAndProjectObjTypes = {
    user_id: string
    user_photo_link: string
    user_fullname: string
    project_id: number
    project_name: string
    project_host_name: string
    project_image_url: string
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

    uploadProfileAction: async ({ locals: { supabase, safeGetSession, compressImage }, request }) => {

        const profilePicture = (await request.formData()).get("uploadProfile") as File;

        const { user } = await safeGetSession();

        const convertedBlob = await compressImage(profilePicture);

        if (user && convertedBlob) {

            const { data: uploadPicture, error: uploadProfileError } = await supabase.storage.from("collab-bucket").upload(user.id, convertedBlob, {
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
    createGuildAction: async ({ locals: { supabase, safeGetSession, compressImage }, request }) => {

        const formData = Object.fromEntries(await request.formData());

        try {
            const { user } = await safeGetSession();
            const result = createGuildSchema.parse(formData);
            const convertedBlob = await compressImage(result.guildPhoto);

            if (user && convertedBlob) {

                const { data: uploadGuildPhoto, error: uploadGuildPhotoError } = await supabase.storage.from("guild-bucket").upload(`${user.id}/${result.guildName}`, convertedBlob, {
                    cacheControl: "3600",
                    upsert: true
                });

                if (uploadGuildPhotoError) return fail(401, { msg: uploadGuildPhotoError.message });
                else if (uploadGuildPhoto) {
                    const { data: { publicUrl } } = supabase.storage.from("guild-bucket").getPublicUrl(uploadGuildPhoto.path);

                    const { error: createGuildError } = await supabase.rpc('insert_guilds', {
                        client_user_id: user.id,
                        client_guild_name: result.guildName,
                        client_max_users: Number(result.maxUsers),
                        client_description: result.description,
                        client_host_name: result.hostName,
                        client_is_private: `${result.visibility === "Public" ? false : true}`,
                        client_joined_count: 1,
                        client_image_url: publicUrl,
                        client_host_photo: result.hostPhoto,
                        client_passcode: `${result.visibility === "Public" ? null : result.passcode}`
                    })

                    if (createGuildError) return fail(401, { msg: createGuildError.message });
                    else return fail(200, { msg: "Guild Created" })
                }
            } else return redirect(301, "/");
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            console.log(fieldErrors)
            return fail(400, { errors: fieldErrors });
        }


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
            client_guild_host_name: parsedUserAndGuildObj.guild_host_name,
            client_guild_image_url: parsedUserAndGuildObj.user_photo_link
        });

        if (checkPassError) return fail(401, { msg: checkPassError.message });
        else if (data) return fail(200, { msg: "You have successfully joined this guild." });
    },

    deleteGuildAction: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData();
        const guildObj: CreatedGuildReference = JSON.parse(formData.get("guildObj") as string);

        const { data: deletedGuildPhoto, error: deleteGuildPhotoError } = await supabase.storage.from("guild-bucket").remove([`${guildObj.user_id}/${guildObj.guild_name}`]);

        if (deleteGuildPhotoError) return fail(401, { msg: deleteGuildPhotoError.message });
        else if (deletedGuildPhoto) {

            const { error: deleteGuildError } = await supabase.from("created_guild_tb").delete().eq("id", guildObj.id);
            if (deleteGuildError) return fail(401, { msg: deleteGuildError.message });
            else return fail(200, { msg: "Guild Deleted Successfully" });
        }


    },

    //projects route
    createProjectAction: async ({ locals: { supabase, safeGetSession, compressImage }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = createProjectSchema.parse(formData);
            const { user } = await safeGetSession();

            const convertedBlob = await compressImage(result.projectPhoto); //sharp technology for compression image in server side

            if (user && convertedBlob) {

                const { data: uploadProject, error: uploadProjectError } = await supabase.storage.from("project-bucket").upload(`${user.id}/${result.projectName}`, convertedBlob, {
                    cacheControl: "3600",
                    upsert: true
                });
                console.log(uploadProjectError?.message)
                if (uploadProjectError) return fail(401, { msg: uploadProjectError.message });
                else if (uploadProject) {
                    const { data: { publicUrl } } = supabase.storage.from("project-bucket").getPublicUrl(uploadProject.path);

                    const { error: createProjectError } = await supabase.rpc("insert_project", {
                        client_user_id: user.id,
                        client_project_name: result.projectName,
                        client_max_users: Number(result.maxUsers),
                        client_description: result.description,
                        client_host_name: result.hostName,
                        client_is_private: `${result.visibility === "Public" ? false : true}`,
                        client_joined_count: 1,
                        client_image_url: publicUrl,
                        client_host_photo: result.hostPhoto,
                        client_passcode: `${result.visibility === "Public" ? null : result.passcode}`
                    });

                    if (createProjectError) return fail(401, { msg: createProjectError.message });
                    else return fail(200, { msg: "Project Created Successfully." });
                }
            } else return redirect(301, "/");
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    checkIfJoinedProjAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const { user } = await safeGetSession();
        const projectId = (await request.formData()).get("projectId") as string;
        if (user) {

            const { data, error: checkIfJoinedError } = await supabase.rpc("check_if_joined_project", { client_project_id: Number(projectId), client_user_id: user.id });
            if (checkIfJoinedError) return fail(401, { msg: checkIfJoinedError.message });
            else if (data) return fail(200, { msg: "Welcome Back." });
            else return fail(400, { msg: "Not joined" });

        } else return redirect(302, "/");
    },

    checkPasswordProjAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const { user } = await safeGetSession();
            const result = checkProjectSchema.parse(formData);

            if (user) {
                const parsedUserAndProjectObj = JSON.parse(result.userAndProjectObj) as UserAndProjectObjTypes;

                const { data, error: checkPassError } = await supabase.rpc("check_password_project", {
                    client_user_id: user.id,
                    client_user_photo_link: parsedUserAndProjectObj.user_photo_link,
                    client_user_fullname: parsedUserAndProjectObj.user_fullname,
                    client_project_id: Number(parsedUserAndProjectObj.project_id),
                    client_project_name: parsedUserAndProjectObj.project_name,
                    client_project_host_name: parsedUserAndProjectObj.project_host_name,
                    client_project_image_url: parsedUserAndProjectObj.project_image_url,
                    client_pass_code: result.passcode
                });

                if (checkPassError) return fail(401, { msg: checkPassError.message });
                else if (data) return fail(200, { msg: "You have successfully joined this project." });
                else return fail(401, { msg: "Invalid Password" });
            } else return redirect(301, "/")



        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    publicJoinProjAction: async ({ locals: { supabase, safeGetSession }, request }) => {

        const { user } = await safeGetSession();
        const formData = await request.formData();
        if (user) {
            const parsedUserAndProjectObj = JSON.parse(formData.get("userAndProjectObj") as string) as UserAndProjectObjTypes;

            const { data, error: checkPassError } = await supabase.rpc("check_password_project", {
                client_user_id: user.id,
                client_user_photo_link: parsedUserAndProjectObj.user_photo_link,
                client_user_fullname: parsedUserAndProjectObj.user_fullname,
                client_project_id: Number(parsedUserAndProjectObj.project_id),
                client_project_name: parsedUserAndProjectObj.project_name,
                client_project_host_name: parsedUserAndProjectObj.project_host_name,
                client_project_image_url: parsedUserAndProjectObj.project_image_url,
            });

            if (checkPassError) return fail(401, { msg: checkPassError.message });
            else if (data) return fail(200, { msg: "You have successfully joined this project." });
        } else return redirect(301, "/")
    },

    deleteProjectActionNews: async ({ locals: { supabase, safeGetSession }, request }) => {

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

        const formData = await request.formData();
        const { user } = await safeGetSession();

        if (user) {
            const moduleId = formData.get("moduleId") as string;
            const fileName = formData.get("fileName") as string;

            const { error: deleteModuleError } = await supabase.from("created_module_tb").delete().match({ user_id: user.id, id: Number(moduleId) });

            if (deleteModuleError) return fail(401, { msg: deleteModuleError.message });
            else {
                const { data: fileDeleted, error: deleteFileError } = await supabase.storage.from("modules-bucket").remove([`${user.id}/${fileName}`]);
                if (deleteFileError) return fail(401, { msg: deleteFileError.message });
                else if (fileDeleted) return fail(200, { msg: "Successfully deleted the module." });
            }
        }

        return redirect(302, "/")

    },

    addCommentAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const { user } = await safeGetSession();
            const result = addCommentSchema.parse(formData);
            const userObj = JSON.parse(result.userObj) as UserReference

            if (user) {
                const { error: insertCommentError } = await supabase.from("module_comments_tb").insert([{
                    user_id: user.id,
                    module_id: result.moduleId,
                    user_fullname: userObj.user_fullname,
                    user_photo_link: userObj.user_photo_link,
                    module_comment: result.commentValue
                }]);

                if (insertCommentError) return fail(401, { msg: insertCommentError.message });
                else return fail(200, { msg: "Comment Added." });

            } else return redirect(302, "/");

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }

};