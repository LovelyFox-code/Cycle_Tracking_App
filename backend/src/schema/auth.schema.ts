import { z } from 'zod';

// Base schema for authentication fields
const authCore = {
    email: z
        .string()
        .nonempty('Email is required')
        .email('Email is invalid'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password cannot be more than 100 characters'),
};

// Schema for user registration
export const registerSchema = z.object({
    body: z.object({
        full_name: z
            .string()
            .min(2, 'Full name must be at least 2 characters')
            .max(100, 'Full name cannot be more than 100 characters'),
        email: authCore.email,
        password: authCore.password,
    }),
});

// Schema for user login
export const loginSchema = z.object({
    body: z.object({
        email: authCore.email,
        password: z.string().nonempty('Password is required'),
    }),
});

// Schema for forgot password
export const forgotPasswordSchema = z.object({
    body: z.object({
        email: authCore.email,
    }),
});

// Schema for reset password
export const resetPasswordSchema = z.object({
    body: z.object({
        token: z.string().nonempty('Token is required'),
        password: authCore.password,
    }),
});

// Types derived from the schemas
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>['body']; 