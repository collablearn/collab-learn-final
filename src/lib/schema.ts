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

export const resetPasswordSchema = z.object({
    email: z.string().email()
});

export const verifyCodeSchema = z.object({
    email: z.string(),
    verifyCode: z.string().min(6, { message: "Must enter a valid format code." })
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
});

export const updatePasswordSchema = z.object({
    newPassword: z.string().min(8, { message: "Must choose a strong password" }),
    confirmNewPassword: z.string(),
    passwordStrength: z.string()
}).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmNewPassword"]
        });

    }
});

//guild route schemas
export const createGuildSchema = z.object({
    hostPhoto: z.string(),
    hostName: z.string(),
    guildName: z.string().min(1, { message: "Must enter a valid guild name." }),
    maxUsers: z.string().refine((value) => Number(value) > 0, { message: "Must enter a valid max users" }),
    description: z.string().min(5, { message: "Must enter a valid description." }),
    visibility: z.string(),
});

export const createGuildSchemaWithPassCode = z.object({
    hostPhoto: z.string(),
    hostName: z.string(),
    guildName: z.string().min(1, { message: "Must enter a valid guild name." }),
    maxUsers: z.string().refine((value) => Number(value) > 0, { message: "Must enter a valid max users" }),
    description: z.string().min(5, { message: "Must enter a valid description." }),
    visibility: z.string(),
    passcode: z.string().min(6, { message: "Must choose a strong passcode." })
});

export const checkGuildPassSchema = z.object({
    userAndGuildObj: z.string(),
    passcode: z.string().min(1, { message: "Passcode must not be empty." })
})

export const addNoteSchema = z.object({
    guildId: z.string(),
    userFullname: z.string(),
    userPhotoLink: z.string(),
    guildNote: z.string().min(5, { message: "Must enter a valid note." }),

})

export const sendGuildChatSchema = z.object({
    sendChatValue: z.string().min(1, { message: "Must enter a valid chat." })
})

//project route schema
export const createProjectSchema = z.object({
    hostPhoto: z.string(),
    hostName: z.string(),
    projectName: z.string().min(1, { message: "Must enter a valid project name." }),
    maxUsers: z.string().refine((value) => Number(value) > 0, { message: "Must enter a valid max users" }),
    description: z.string().min(5, { message: "Must enter a valid description." }),
    visibility: z.string(),
})

export const createProjectSchemaWithPassCode = z.object({
    hostPhoto: z.string(),
    hostName: z.string(),
    projectName: z.string().min(1, { message: "Must enter a valid project name." }),
    maxUsers: z.string().refine((value) => Number(value) > 0, { message: "Must enter a valid max users" }),
    description: z.string().min(5, { message: "Must enter a valid description." }),
    visibility: z.string(),
    passcode: z.string().min(6, { message: "Must choose a strong passcode." })
});

//learning module route schema
export const uploadModuleSchema = z.object({
    uploadModule: z.instanceof(File).refine((file) => file.size > 0, { message: "Must upload a module" }),
    moduleName: z.string().min(5, { message: "Must enter a valid module name." }),
    description: z.string().min(5, { message: "Must enter a valid description." })
})