// components/examples/RefactoredDashboard.tsx
// This is an example of how to refactor the Dashboard component using the new reusable components

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import reusable components
import { Header, SectionTitle, RecommendationCard, ProgressSummary, CycleTracker } from '..';

// Import utilities
import { getUserData, updateUserPoints, completeTask } from '@/utils/storage';
import {
  getCurrentPhase,
  getPhaseInfo,
  calculateDaysInPhase,
} from '@/utils/cycleCalculations';

type UserData = {
  name?: string;
  lastPeriodDate: string;
  cycleLength: number;
  completedTasks?: { [date: string]: string[] };
  totalPoints?: number;
};

export default function RefactoredDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);
  const [phaseInfo, setPhaseInfo] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [cycleDay, setCycleDay] = useState(1);
  const [cycleLength, setCycleLength] = useState(28);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
      const phase = getCurrentPhase(data.lastPeriodDate, data.cycleLength);
      setCurrentPhase(phase);
      setPhaseInfo(getPhaseInfo(phase));

      // Calculate current cycle day
      const lastPeriod = new Date(data.lastPeriodDate);
      const currentDate = new Date();
      const daysSinceLastPeriod = Math.floor(
        (currentDate.getTime() - lastPeriod.getTime()) / (24 * 60 * 60 * 1000)
      );
      const currentCycleDay = (daysSinceLastPeriod % data.cycleLength) + 1;
      setCycleDay(currentCycleDay);
      setCycleLength(data.cycleLength);

      // Load completed tasks for today
      const today = new Date().toDateString();
      const todayTasks = data.completedTasks?.[today] || [];
      setCompletedTasks(new Set(todayTasks));
    }
  };

  const handleTaskComplete = async (taskType: string, points: number) => {
    if (completedTasks.has(taskType)) {
      return;
    }

    const newCompletedTasks = new Set(completedTasks);
    newCompletedTasks.add(taskType);
    setCompletedTasks(newCompletedTasks);

    await completeTask(taskType);
    await updateUserPoints(points);

    Alert.alert('Great job!', `You earned ${points} points!`);
    loadUserData(); // Refresh data
  };

  if (!userData || !currentPhase || !phaseInfo) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading your cycle data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const daysInPhase = calculateDaysInPhase(
    userData.lastPeriodDate,
    userData.cycleLength,
    currentPhase
  );

  // Prepare progress summary items
  const progressItems = [
    { label: 'Total Points', value: userData.totalPoints || 0 },
    { 
      label: 'Current Level', 
      value: `Level ${Math.floor((userData.totalPoints || 0) / 100) + 1}` 
    },
    { label: 'Tasks Today', value: `${completedTasks.size}/3` },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header
          greeting={`Hello, ${userData.name || 'there'}!`}
          subtitle="Let's sync with your cycle today"
        />

        {/* Cycle Tracker */}
        <CycleTracker
          cycleDay={cycleDay}
          cycleLength={cycleLength}
          currentPhase={currentPhase}
          phaseInfo={phaseInfo}
        />

        {/* Today's Recommendations */}
        <View style={styles.section}>
          <SectionTitle title="Today's Recommendations" />

          {/* Workout Card */}
          <RecommendationCard
            title="Workout"
            icon="🏃‍♀️"
            content={phaseInfo.workout}
            isCompleted={completedTasks.has('workout')}
            onComplete={() => handleTaskComplete('workout', 5)}
            disabled={completedTasks.has('workout')}
          />

          {/* Nutrition Card */}
          <RecommendationCard
            title="Nutrition Focus"
            icon="🍽️"
            content={phaseInfo.nutrition}
            isCompleted={completedTasks.has('nutrition')}
            onComplete={() => handleTaskComplete('nutrition', 3)}
            disabled={completedTasks.has('nutrition')}
          />

          {/* Recovery Card */}
          <RecommendationCard
            title="Self-Care"
            icon="🧘‍♀️"
            content={phaseInfo.recovery}
            isCompleted={completedTasks.has('recovery')}
            onComplete={() => handleTaskComplete('recovery', 2)}
            disabled={completedTasks.has('recovery')}
          />
        </View>

        {/* Progress Summary */}
        <ProgressSummary items={progressItems} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    padding: 20,
  },
});