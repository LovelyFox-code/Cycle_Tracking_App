import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../db/supabase';
import { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../schema/auth.schema';
import config from '../config/env';

const JWT_SECRET = config.jwtSecret;
const JWT_EXPIRES_IN = '7d';

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
    token?: string;
}

export interface UserData {
    id: string;
    email: string;
    full_name: string;
    created_at: string;
}

export class AuthService {
    // Register a new user
    static async register(userData: RegisterInput): Promise<AuthResponse> {
        try {
            // Check if user already exists
            const { data: existingUser, error: checkError } = await supabase
                .from('users')
                .select('id')
                .eq('email', userData.email)
                .single();

            if (existingUser) {
                return {
                    success: false,
                    message: 'User with this email already exists',
                };
            }

            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

            // Create user in Supabase
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert([
                    {
                        email: userData.email,
                        full_name: userData.full_name,
                        password_hash: hashedPassword,
                        dietary_preference: null,
                        theme_preference: 'light',
                        notifications_enabled: true,
                    },
                ])
                .select()
                .single();

            if (createError) {
                console.error('Error creating user:', createError);
                return {
                    success: false,
                    message: 'Failed to create user',
                };
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            return {
                success: true,
                message: 'User registered successfully',
                data: {
                    id: newUser.id,
                    email: newUser.email,
                    full_name: newUser.full_name,
                    created_at: newUser.created_at,
                },
                token,
            };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'Internal server error',
            };
        }
    }

    // Login user
    static async login(credentials: LoginInput): Promise<AuthResponse> {
        try {
            // Find user by email
            const { data: user, error: findError } = await supabase
                .from('users')
                .select('*')
                .eq('email', credentials.email)
                .single();

            if (findError || !user) {
                return {
                    success: false,
                    message: 'Invalid email or password',
                };
            }

            // Check if password hash exists (for users created before password hashing was implemented)
            if (!user.password_hash) {
                return {
                    success: false,
                    message: 'Account needs to be updated. Please contact support.',
                };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Invalid email or password',
                };
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            return {
                success: true,
                message: 'Login successful',
                data: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    dietary_preference: user.dietary_preference,
                    theme_preference: user.theme_preference,
                    notifications_enabled: user.notifications_enabled,
                    created_at: user.created_at,
                },
                token,
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Internal server error',
            };
        }
    }

    // Forgot password
    static async forgotPassword(data: ForgotPasswordInput): Promise<AuthResponse> {
        try {
            // Check if user exists
            const { data: user, error: findError } = await supabase
                .from('users')
                .select('id, email')
                .eq('email', data.email)
                .single();

            if (findError || !user) {
                // Don't reveal if user exists or not for security
                return {
                    success: true,
                    message: 'If an account with this email exists, a reset link has been sent',
                };
            }

            // Generate reset token
            const resetToken = jwt.sign(
                { userId: user.id, email: user.email, type: 'password_reset' },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Store reset token in database (you might want to create a separate table for this)
            const { error: updateError } = await supabase
                .from('users')
                .update({ reset_token: resetToken, reset_token_expires: new Date(Date.now() + 3600000) })
                .eq('id', user.id);

            if (updateError) {
                console.error('Error storing reset token:', updateError);
                return {
                    success: false,
                    message: 'Failed to process password reset',
                };
            }

            // TODO: Send email with reset link
            // For now, we'll just return success
            console.log('Password reset token generated:', resetToken);

            return {
                success: true,
                message: 'If an account with this email exists, a reset link has been sent',
            };
        } catch (error) {
            console.error('Forgot password error:', error);
            return {
                success: false,
                message: 'Internal server error',
            };
        }
    }

    // Reset password
    static async resetPassword(data: ResetPasswordInput): Promise<AuthResponse> {
        try {
            // Verify reset token
            const decoded = jwt.verify(data.token, JWT_SECRET) as any;

            if (decoded.type !== 'password_reset') {
                return {
                    success: false,
                    message: 'Invalid reset token',
                };
            }

            // Check if user exists and token is valid
            const { data: user, error: findError } = await supabase
                .from('users')
                .select('id, reset_token, reset_token_expires')
                .eq('id', decoded.userId)
                .single();

            if (findError || !user) {
                return {
                    success: false,
                    message: 'Invalid reset token',
                };
            }

            // Check if token matches and is not expired
            if (user.reset_token !== data.token || new Date(user.reset_token_expires) < new Date()) {
                return {
                    success: false,
                    message: 'Reset token has expired or is invalid',
                };
            }

            // Hash new password
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            // Update password and clear reset token
            const { error: updateError } = await supabase
                .from('users')
                .update({
                    password_hash: hashedPassword,
                    reset_token: null,
                    reset_token_expires: null,
                })
                .eq('id', user.id);

            if (updateError) {
                console.error('Error updating password:', updateError);
                return {
                    success: false,
                    message: 'Failed to reset password',
                };
            }

            return {
                success: true,
                message: 'Password reset successfully',
            };
        } catch (error) {
            console.error('Reset password error:', error);
            return {
                success: false,
                message: 'Invalid or expired reset token',
            };
        }
    }

    // Verify JWT token
    static verifyToken(token: string): { userId: string; email: string } | null {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            return {
                userId: decoded.userId,
                email: decoded.email,
            };
        } catch (error) {
            return null;
        }
    }
} 