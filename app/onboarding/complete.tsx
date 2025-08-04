import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, ArrowRight } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { saveUserData } from '@/utils/storage';
import { colors } from '@/styles/theme';

export default function CompleteScreen() {
  const params = useLocalSearchParams();

  useEffect(() => {
    saveOnboardingData();
  }, []);

  const saveOnboardingData = async () => {
    const userData = {
      name: 'Alina', // Adding a default name
      lastPeriodDate: params.lastPeriodDate,
      cycleLength: parseInt(
        Array.isArray(params.cycleLength)
          ? params.cycleLength[0]
          : params.cycleLength
      ),
      goals:
        typeof params.goals === 'string' ? [params.goals] : params.goals || [],
      totalPoints: 0,
      createdAt: new Date().toISOString(),
      completedTasks: {},
    };

    await saveUserData(userData);
  };

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={colors.gradient.primary} style={styles.background}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={colors.gradient.primary}
                style={styles.successCircle}
              >
                <CheckCircle size={64} color="#FFFFFF" />
              </LinearGradient>
            </View>

            {/* Success Message */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>You're all set!</Text>
              <Text style={styles.subtitle}>
                Welcome to your personalized wellness journey with CycleSync
              </Text>
              <Text style={styles.description}>
                We've created a customized experience based on your cycle and
                goals. You'll receive daily recommendations that adapt to your
                menstrual phase, helping you optimize your wellness routine.
              </Text>
            </View>

            {/* What's Next */}
            <View style={styles.nextStepsContainer}>
              <Text style={styles.nextStepsTitle}>What happens next?</Text>
              <View style={styles.stepsList}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Get daily personalized recommendations
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Complete tasks to earn points and level up
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Track your cycle and discover patterns
                  </Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <Text style={styles.stepText}>
                    Unlock achievements as you progress
                  </Text>
                </View>
              </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleGetStarted}
            >
              <LinearGradient
                colors={colors.gradient.primary}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Start My Journey</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.encouragement}>
              🌸 Remember: Small consistent steps lead to lasting wellness
              changes
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
    padding: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#10B981',
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
  nextStepsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  stepsList: {
    // Steps list container
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
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
  encouragement: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
