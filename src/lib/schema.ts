import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    passwordStrength: z.string(),
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

export const updateInformationSchema = z.object({
    bio: z.string().min(5, { message: "Must enter a valid bio." }),
    firstName: z.string().min(1, { message: "Must enter a valid first name" }),
    lastName: z.string().min(1, { message: "Must enter a valid last name." }),
    address: z.string().min(3, { message: "Must enter a valid address." }),
    barangay: z.string().min(3, { message: "Must enter a valid barangay" }),
    city: z.string().min(3, { message: "Must enter a valid city." }),
    religion: z.string().min(3, { message: "Must enter a valid religion" }),
    contactNumber: z.string().min(8, { message: "Must enter a valid contact number." }),
    profilePicture: z.array(z.object({
        name: z.string(),
        size: z.number(),
        type: z.string()
    }))
})