import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function GoalsScreen() {
  const params = useLocalSearchParams();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    {
      id: 'balance',
      title: 'Balance',
      description: 'Find harmony between mind and body',
      emoji: '⚖️',
    },
    {
      id: 'strength',
      title: 'Strength',
      description: 'Build physical power and endurance',
      emoji: '💪',
    },
    {
      id: 'fat-loss',
      title: 'Fat Loss',
      description: 'Achieve healthy body composition',
      emoji: '🔥',
    },
    {
      id: 'mental-clarity',
      title: 'Mental Clarity',
      description: 'Improve focus and cognitive function',
      emoji: '🧠',
    },
    {
      id: 'energy',
      title: 'Energy',
      description: 'Boost vitality and reduce fatigue',
      emoji: '⚡',
    },
    {
      id: 'stress-relief',
      title: 'Stress Relief',
      description: 'Manage stress and improve mood',
      emoji: '🧘‍♀️',
    },
  ];

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else if (selectedGoals.length < 3) {
      setSelectedGoals([...selectedGoals, goalId]);
    } else {
      Alert.alert('Limit reached', 'You can select up to 3 goals to focus on.');
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length === 0) {
      Alert.alert(
        'Please select goals',
        'Choose at least one goal to personalize your experience.'
      );
      return;
    }

    const completeData = {
      lastPeriodDate: params.lastPeriodDate,
      cycleLength: parseInt(params.cycleLength as string),
      goals: selectedGoals,
    };

    router.push({
      pathname: '/onboarding/complete',
      params: completeData,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFE5E5', '#FAFAFA']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.step}>Step 2 of 3</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Target size={32} color="#FF6B6B" />
              <Text style={styles.title}>What are your wellness goals?</Text>
              <Text style={styles.subtitle}>
                Select up to 3 goals that matter most to you. We'll personalize
                your experience accordingly.
              </Text>
            </View>

            <View style={styles.goalsContainer}>
              {goals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    selectedGoals.includes(goal.id) && styles.selectedGoal,
                  ]}
                  onPress={() => toggleGoal(goal.id)}
                >
                  <View style={styles.goalHeader}>
                    <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        selectedGoals.includes(goal.id) && styles.checkedBox,
                      ]}
                    >
                      {selectedGoals.includes(goal.id) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.goalTitle,
                      selectedGoals.includes(goal.id) &&
                        styles.selectedGoalText,
                    ]}
                  >
                    {goal.title}
                  </Text>
                  <Text
                    style={[
                      styles.goalDescription,
                      selectedGoals.includes(goal.id) &&
                        styles.selectedGoalDescription,
                    ]}
                  >
                    {goal.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.selectionInfo}>
              <Text style={styles.selectionText}>
                {selectedGoals.length}/3 goals selected
              </Text>
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Continue</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  step: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  goalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  selectedGoal: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalEmoji: {
    fontSize: 32,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  selectedGoalText: {
    color: '#FF6B6B',
  },
  goalDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  selectedGoalDescription: {
    color: '#374151',
  },
  selectionInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  selectionText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  continueButton: {
    marginTop: 'auto',
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
});
