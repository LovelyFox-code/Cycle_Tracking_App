import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  Droplets,
  Sun,
  Moon,
  CircleCheck as CheckCircle,
  Plus,
  Leaf,
} from 'lucide-react-native';
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

export default function Dashboard() {
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

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'menstrual':
        return <Droplets size={24} color="#FF6B6B" />;
      case 'follicular':
        return <Sun size={24} color="#FFD93D" />;
      case 'ovulation':
        return <Heart size={24} color="#FF1744" />;
      case 'luteal':
        return <Leaf size={24} color="#8E24AA" />;
      default:
        return <Heart size={24} color="#FF6B6B" />;
    }
  };

  const getCycleProgressBarColors = (): [string, string, ...string[]] => {
    return ['#F9A826', '#FF6B6B', '#4FC3F7', '#8E24AA'];
  };

  const getCyclePosition = () => {
    return (cycleDay / cycleLength) * 100;
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

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {userData.name || 'there'}!
          </Text>
          <Text style={styles.subtitle}>Let's sync with your cycle today</Text>
        </View>

        {/* Cycle Tracker Section */}
        <View style={styles.cycleTrackerSection}>
          <Text style={styles.cycleTrackerTitle}>Cycle Tracker</Text>

          <View style={styles.cycleInfoRow}>
            <Text style={styles.cycleInfoText}>Today</Text>
            <Text style={styles.cycleInfoSeparator}>|</Text>
            <Text style={styles.cycleInfoText}>Day {cycleDay}</Text>
            <Text style={styles.cycleInfoSeparator}>|</Text>
            <Text style={styles.cycleInfoText}>
              {phaseInfo.name} {currentPhase === 'luteal' ? 'Fall' : 'Phase'}
            </Text>
          </View>

          <Text style={styles.cycleMessage}>
            You're steady and productive; enjoy the slower pace.
          </Text>

          {/* Phase Labels */}
          <View style={styles.phaseLabelsContainer}>
            <View style={styles.phaseLabel}>
              <View style={[styles.phaseDot, { backgroundColor: '#F9A826' }]} />
              <Text style={styles.phaseLabelText}>Luteal</Text>
            </View>
            <View style={styles.phaseLabel}>
              <View style={[styles.phaseDot, { backgroundColor: '#4FC3F7' }]} />
              <Text style={styles.phaseLabelText}>Menstruation</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={getCycleProgressBarColors()}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressBar}
            />

            {/* Current Position Indicator */}
            <View
              style={[
                styles.positionIndicator,
                { left: `${getCyclePosition()}%` },
              ]}
            >
              <View style={styles.iconCircle}>
                {getPhaseIcon(currentPhase)}
              </View>
            </View>
          </View>
        </View>

        {/* Today's Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendations</Text>

          {/* Workout Card */}
          <View style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>🏃‍♀️ Workout</Text>
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  completedTasks.has('workout') && styles.completedButton,
                ]}
                onPress={() => handleTaskComplete('workout', 5)}
                disabled={completedTasks.has('workout')}
              >
                <CheckCircle
                  size={20}
                  color={completedTasks.has('workout') ? '#4CAF50' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardContent}>{phaseInfo.workout}</Text>
          </View>

          {/* Nutrition Card */}
          <View style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>🍽️ Nutrition Focus</Text>
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  completedTasks.has('nutrition') && styles.completedButton,
                ]}
                onPress={() => handleTaskComplete('nutrition', 3)}
                disabled={completedTasks.has('nutrition')}
              >
                <CheckCircle
                  size={20}
                  color={
                    completedTasks.has('nutrition') ? '#4CAF50' : '#9CA3AF'
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardContent}>{phaseInfo.nutrition}</Text>
          </View>

          {/* Recovery Card */}
          <View style={styles.recommendationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>🧘‍♀️ Self-Care</Text>
              <TouchableOpacity
                style={[
                  styles.completeButton,
                  completedTasks.has('recovery') && styles.completedButton,
                ]}
                onPress={() => handleTaskComplete('recovery', 2)}
                disabled={completedTasks.has('recovery')}
              >
                <CheckCircle
                  size={20}
                  color={completedTasks.has('recovery') ? '#4CAF50' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardContent}>{phaseInfo.recovery}</Text>
          </View>
        </View>

        {/* Progress Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Total Points</Text>
              <Text style={styles.progressValue}>
                {userData.totalPoints || 0}
              </Text>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Current Level</Text>
              <Text style={styles.progressValue}>
                Level {Math.floor((userData.totalPoints || 0) / 100) + 1}
              </Text>
            </View>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Tasks Today</Text>
              <Text style={styles.progressValue}>{completedTasks.size}/3</Text>
            </View>
          </View>
        </View>
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
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  cycleTrackerSection: {
    backgroundColor: '#F5E6DA',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
  },
  cycleTrackerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  cycleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cycleInfoText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  cycleInfoSeparator: {
    fontSize: 20,
    color: '#9CA3AF',
    marginHorizontal: 12,
  },
  cycleMessage: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 20,
  },
  phaseLabelsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  phaseLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  phaseLabelText: {
    fontSize: 16,
    color: '#4B5563',
  },
  progressBarContainer: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 8,
    width: '100%',
  },
  positionIndicator: {
    position: 'absolute',
    top: -20,
    transform: [{ translateX: -25 }],
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  phaseCard: {
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  phaseInfo: {
    marginLeft: 12,
    flex: 1,
  },
  phaseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  phaseDay: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  phaseMessage: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  cardContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  completeButton: {
    padding: 4,
  },
  completedButton: {
    opacity: 0.6,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});
