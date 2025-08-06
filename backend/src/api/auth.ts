import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../schema/auth.schema';

// Register new user
export const registerHandler = async (req: Request, res: Response) => {
    try {
        const userData: RegisterInput = req.body;
        const result = await AuthService.register(userData);

        if (result.success) {
            res.status(201).json({
                success: true,
                message: result.message,
                data: result.data,
                token: result.token,
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Register handler error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Login user
export const loginHandler = async (req: Request, res: Response) => {
    try {
        const credentials: LoginInput = req.body;
        const result = await AuthService.login(credentials);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
                data: result.data,
                token: result.token,
            });
        } else {
            res.status(401).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Login handler error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Forgot password
export const forgotPasswordHandler = async (req: Request, res: Response) => {
    try {
        const data: ForgotPasswordInput = req.body;
        const result = await AuthService.forgotPassword(data);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Forgot password handler error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Reset password
export const resetPasswordHandler = async (req: Request, res: Response) => {
    try {
        const data: ResetPasswordInput = req.body;
        const result = await AuthService.resetPassword(data);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Reset password handler error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Verify token
export const verifyTokenHandler = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        const decoded = AuthService.verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid',
            data: decoded,
        });
    } catch (error) {
        console.error('Verify token handler error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}; 