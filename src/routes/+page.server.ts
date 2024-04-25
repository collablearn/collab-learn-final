import { loginSchema, registerSchema, resetPasswordSchema, verifyCodeSchema } from "$lib/schema";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import dotenv from 'dotenv';
import transporter from "$lib/helpers.server";

import type { ZodError } from "zod";
import type { PageServerLoad } from "./$types";
import type { SentMessageInfo } from "nodemailer";

interface EmailMessage {
    from: string;
    bcc: string;
    subject: string;
    html: string;
}

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
    const { user } = await safeGetSession();

    if (user) redirect(302, "/dashboard");

};

dotenv.config();
const email = process.env.GMAIL_EMAIL;

const sendEmail = async (message: EmailMessage): Promise<SentMessageInfo> => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
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
                password: result.password
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
                } else {
                    const html = ` 
                    <h2>Hi👋 ${result.firstName}, </h2>
                    <p>Thank you for registering in our system.</p>
                    `;
                    const message = {
                        from: email ?? "",
                        bcc: user.email ?? "",
                        subject: "Collab Learn Registration",
                        html,
                    };

                    await sendEmail(message);
                    return fail(200, { msg: "Registered Successfully." });

                }
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

    resetPasswordAction: async ({ locals: { supabase }, request }) => {

        const formData = Object.fromEntries(await request.formData());

        try {
            const result = resetPasswordSchema.parse(formData);

            const { error: resetPasswordError } = await supabase.auth.resetPasswordForEmail(result.email);

            if (resetPasswordError) return fail(401, { msg: resetPasswordError.message });
            else return fail(200, { msg: `A reset code has been sent to your email address ${result.email}. Kindly check your inbox.`, email: result.email });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }


    },

    verifyCodeAction: async ({ locals: { supabase }, request }) => {


        const formData = Object.fromEntries(await request.formData());
        try {
            const result = verifyCodeSchema.parse(formData);
            const { data: { session }, error: verifyCodeError } = await supabase.auth.verifyOtp({ email: result.email, token: result.verifyCode, type: 'email' });

            if (verifyCodeError) return fail(401, { msg: verifyCodeError.message });
            else if (session) return fail(200, { msg: "Code Verified." });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },



};