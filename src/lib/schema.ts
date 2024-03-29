import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "Must enter a valid first name" }),
    lastName: z.string().min(1, { message: "Must enter a valid last name." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Must choose a strong password" }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {

    if (password !== confirmPassword) {

        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });

    }

});
