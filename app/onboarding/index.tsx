import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function OnboardingWelcome() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFE5E5', '#FAFAFA']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Logo/Icon */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.logoCircle}
              >
                <Heart size={48} color="#FFFFFF" />
              </LinearGradient>
            </View>

            {/* Welcome Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to CycleSync</Text>
              <Text style={styles.subtitle}>
                Your personal wellness companion that adapts to your menstrual cycle
              </Text>
              <Text style={styles.description}>
                Get personalized workouts, nutrition advice, and self-care tips based on your cycle phase. 
                Track your progress and earn rewards for staying consistent with your wellness goals.
              </Text>
            </View>

            {/* Features List */}
            <View style={styles.featuresList}>
              <View style={styles.feature}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Phase-specific workout recommendations</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Personalized nutrition guidance</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Cycle tracking and predictions</Text>
              </View>
              <View style={styles.feature}>
                <View style={styles.featureDot} />
                <Text style={styles.featureText}>Points and achievements system</Text>
              </View>
            </View>

            {/* Get Started Button */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push('/onboarding/cycle-info')}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              This app is for educational purposes. Always consult healthcare professionals for medical advice.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresList: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  startButton: {
    marginBottom: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
});