import { z } from 'zod';

// Base schema for user fields
const userCore = {
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email is invalid'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot be more than 30 characters')
    .optional()
};

// Schema for creating a new user
export const createUserSchema = z.object({
  body: z.object({
    ...userCore
  })
});

// Schema for updating an existing user
export const updateUserSchema = z.object({
  body: z.object({
    email: userCore.email.optional(),
    username: userCore.username
  }),
  params: z.object({
    id: z.string().uuid('Invalid user ID format')
  })
});

// Types derived from the schemas
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];