import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react-native';
import { Button } from '@/components/common';
import { login } from '@/utils/auth';

export default function LoginScreen() {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const result = await login(email, password);

            if (result.success) {
                router.replace('/(tabs)');
            } else {
                Alert.alert('Login Failed', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        router.push('/auth/forget');
    };

    const handleRegister = () => {
        router.push('/auth/register');
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.colors.background.main }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={24} color={theme.colors.text.primary} />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                        Welcome Back
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
                        Sign in to continue your health journey
                    </Text>

                    <View style={styles.form}>
                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.card }]}>
                            <Mail size={20} color={theme.colors.text.muted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary }]}
                                placeholder="Email"
                                placeholderTextColor={theme.colors.text.muted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.card }]}>
                            <Lock size={20} color={theme.colors.text.muted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary }]}
                                placeholder="Password"
                                placeholderTextColor={theme.colors.text.muted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color={theme.colors.text.muted} />
                                ) : (
                                    <Eye size={20} color={theme.colors.text.muted} />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={handleForgotPassword}
                        >
                            <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Sign In"
                            onPress={handleLogin}
                            loading={isLoading}
                            style={styles.loginButton}
                        />

                        <View style={styles.divider}>
                            <View style={[styles.dividerLine, { backgroundColor: theme.colors.background.highlight }]} />
                            <Text style={[styles.dividerText, { color: theme.colors.text.muted }]}>
                                or
                            </Text>
                            <View style={[styles.dividerLine, { backgroundColor: theme.colors.background.highlight }]} />
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, { backgroundColor: theme.colors.background.card }]}
                            onPress={handleRegister}
                        >
                            <Text style={[styles.registerButtonText, { color: theme.colors.text.primary }]}>
                                Don't have an account? Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 1,
        padding: 8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 120,
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    eyeButton: {
        padding: 4,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        marginBottom: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
    },
    registerButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
}); 