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
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { Button } from '@/components/common';
import { forgotPassword } from '@/utils/auth';

export default function ForgetPasswordScreen() {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setIsLoading(true);
        try {
            const result = await forgotPassword(email);

            if (result.success) {
                setEmailSent(true);
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        router.push('/auth/login');
    };

    if (emailSent) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <View style={styles.successIcon}>
                            <CheckCircle size={80} color={theme.colors.primary} />
                        </View>

                        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                            Check Your Email
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
                            We've sent a password reset link to{'\n'}
                            <Text style={[styles.emailText, { color: theme.colors.primary }]}>
                                {email}
                            </Text>
                        </Text>

                        <Text style={[styles.instructionText, { color: theme.colors.text.muted }]}>
                            Click the link in the email to reset your password. The link will expire in 1 hour.
                        </Text>

                        <Button
                            title="Back to Login"
                            onPress={handleBackToLogin}
                            style={styles.backToLoginButton}
                        />

                        <TouchableOpacity
                            style={styles.resendButton}
                            onPress={() => setEmailSent(false)}
                        >
                            <Text style={[styles.resendText, { color: theme.colors.primary }]}>
                                Didn't receive the email? Resend
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

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
                        Forgot Password?
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
                        Enter your email address and we'll send you a link to reset your password
                    </Text>

                    <View style={styles.form}>
                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.card }]}>
                            <Mail size={20} color={theme.colors.text.muted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary }]}
                                placeholder="Email Address"
                                placeholderTextColor={theme.colors.text.muted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <Button
                            title="Send Reset Link"
                            onPress={handleResetPassword}
                            loading={isLoading}
                            style={styles.resetButton}
                        />

                        <TouchableOpacity
                            style={styles.backToLoginContainer}
                            onPress={handleBackToLogin}
                        >
                            <Text style={[styles.backToLoginText, { color: theme.colors.text.muted }]}>
                                Remember your password?{' '}
                                <Text style={[styles.backToLoginLink, { color: theme.colors.primary }]}>
                                    Sign In
                                </Text>
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
        lineHeight: 24,
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
        marginBottom: 24,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    resetButton: {
        marginBottom: 24,
    },
    backToLoginContainer: {
        alignItems: 'center',
    },
    backToLoginText: {
        fontSize: 14,
    },
    backToLoginLink: {
        fontWeight: '500',
    },
    successIcon: {
        alignItems: 'center',
        marginBottom: 24,
    },
    emailText: {
        fontWeight: '600',
    },
    instructionText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
    },
    backToLoginButton: {
        marginBottom: 24,
    },
    resendButton: {
        alignItems: 'center',
    },
    resendText: {
        fontSize: 14,
        fontWeight: '500',
    },
}); 