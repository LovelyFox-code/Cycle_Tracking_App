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
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import { Button } from '@/components/common';
import { register } from '@/utils/auth';

export default function RegisterScreen() {
    const { theme } = useTheme();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        try {
            const result = await register(fullName, email, password);

            if (result.success) {
                Alert.alert(
                    'Success',
                    'Account created successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.push('/(tabs)'),
                        },
                    ]
                );
            } else {
                Alert.alert('Registration Failed', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        router.push('/auth/login');
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
                        Create Account
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
                        Join us on your health journey
                    </Text>

                    <View style={styles.form}>
                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.card }]}>
                            <User size={20} color={theme.colors.text.muted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary }]}
                                placeholder="Full Name"
                                placeholderTextColor={theme.colors.text.muted}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                        </View>

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

                        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.card }]}>
                            <Lock size={20} color={theme.colors.text.muted} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: theme.colors.text.primary }]}
                                placeholder="Confirm Password"
                                placeholderTextColor={theme.colors.text.muted}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} color={theme.colors.text.muted} />
                                ) : (
                                    <Eye size={20} color={theme.colors.text.muted} />
                                )}
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.termsText, { color: theme.colors.text.muted }]}>
                            By creating an account, you agree to our{' '}
                            <Text style={[styles.termsLink, { color: theme.colors.primary }]}>
                                Terms of Service
                            </Text>{' '}
                            and{' '}
                            <Text style={[styles.termsLink, { color: theme.colors.primary }]}>
                                Privacy Policy
                            </Text>
                        </Text>

                        <Button
                            title="Create Account"
                            onPress={handleRegister}
                            loading={isLoading}
                            style={styles.registerButton}
                        />

                        <View style={styles.divider}>
                            <View style={[styles.dividerLine, { backgroundColor: theme.colors.background.highlight }]} />
                            <Text style={[styles.dividerText, { color: theme.colors.text.muted }]}>
                                or
                            </Text>
                            <View style={[styles.dividerLine, { backgroundColor: theme.colors.background.highlight }]} />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, { backgroundColor: theme.colors.background.card }]}
                            onPress={handleLogin}
                        >
                            <Text style={[styles.loginButtonText, { color: theme.colors.text.primary }]}>
                                Already have an account? Sign In
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
    termsText: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 18,
    },
    termsLink: {
        fontWeight: '500',
    },
    registerButton: {
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
    loginButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
}); 