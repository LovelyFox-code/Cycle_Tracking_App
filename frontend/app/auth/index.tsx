import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/common';

export default function WelcomeScreen() {
    const { theme } = useTheme();

    const handleLogin = () => {
        router.push('/auth/login');
    };

    const handleRegister = () => {
        router.push('/auth/register');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/icon.png')}
                        style={styles.logo}
                    />
                </View>

                <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                    Welcome to Women's Health
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
                    Your personalized health companion for cycle tracking, nutrition, fitness, and recovery
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Sign In"
                        onPress={handleLogin}
                        style={styles.loginButton}
                    />

                    <TouchableOpacity
                        style={[styles.registerButton, { backgroundColor: theme.colors.background.card }]}
                        onPress={handleRegister}
                    >
                        <Text style={[styles.registerButtonText, { color: theme.colors.text.primary }]}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.footerText, { color: theme.colors.text.muted }]}>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 48,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 24,
    },
    loginButton: {
        marginBottom: 16,
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
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
}); 