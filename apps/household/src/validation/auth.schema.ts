import { z } from 'zod';

const validationSignupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            "Must contain: One uppercase, One lowercase, One number, and One special character"
        ),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const validationSigninSchema = z.object({
    email: z.string().nonempty('Email is required').email("Invalid email format"),
    password: z.string().nonempty("Password is required"),
});

type SigninFormSchema = z.infer<typeof validationSigninSchema>; 
type SignupFormSchema = z.infer<typeof validationSignupSchema>;

export { SigninFormSchema, SignupFormSchema, validationSigninSchema, validationSignupSchema }