import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

export interface AuthUser {
    id: string;
    email: string;
    full_name: string;
    dietary_preference?: string;
    theme_preference?: string;
    notifications_enabled?: boolean;
    created_at: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: AuthUser;
    token?: string;
}

// Store authentication token
export const storeToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

// Get stored authentication token
export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

// Remove authentication token
export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error removing token:', error);
    }
};

// Store user data
export const storeUser = async (user: AuthUser): Promise<void> => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
    }
};

// Get stored user data
export const getUser = async (): Promise<AuthUser | null> => {
    try {
        const userData = await AsyncStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

// Remove user data
export const removeUser = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error removing user:', error);
    }
};

// Clear all authentication data
export const clearAuth = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = await getToken();
        return !!token;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};

// API base URL
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Make authenticated API request
export const apiRequest = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = await getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
};

// Login function
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success && data.token) {
            await storeToken(data.token);
            if (data.data) {
                await storeUser(data.data);
            }
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Network error. Please try again.',
        };
    }
};

// Register function
export const register = async (
    fullName: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ full_name: fullName, email, password }),
        });

        const data = await response.json();

        if (data.success && data.token) {
            await storeToken(data.token);
            if (data.data) {
                await storeUser(data.data);
            }
        }

        return data;
    } catch (error) {
        console.error('Register error:', error);
        return {
            success: false,
            message: 'Network error. Please try again.',
        };
    }
};

// Forgot password function
export const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
        const response = await apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });

        return await response.json();
    } catch (error) {
        console.error('Forgot password error:', error);
        return {
            success: false,
            message: 'Network error. Please try again.',
        };
    }
};

// Logout function
export const logout = async (): Promise<void> => {
    await clearAuth();
}; 