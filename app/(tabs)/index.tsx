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
  CircleCheck as CheckCircle,
  Leaf,
} from 'lucide-react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { getUserData, updateUserPoints, completeTask } from '@/utils/storage';
import {
  getCurrentPhase,
  getPhaseInfo,
  calculateDaysInPhase,
} from '@/utils/cycleCalculations';
import { useTheme } from '@/hooks/useTheme';

type UserData = {
  name?: string;
  lastPeriodDate: string;
  cycleLength: number;
  completedTasks?: { [date: string]: string[] };
  totalPoints?: number;
};

export default function Dashboard() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);
  const [phaseInfo, setPhaseInfo] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [cycleDay, setCycleDay] = useState(1);
  const [cycleLength, setCycleLength] = useState(28);
  const positionX = useSharedValue(0);
  const progressBarWidth = useSharedValue(0);

  useEffect(() => {
    loadUserData();
  }, []);

  // Update position when cycle day changes or when progress bar width is set
  useEffect(() => {
    // Use a timeout to ensure the layout is complete
    const timer = setTimeout(() => {
      if (progressBarWidth.value > 0) {
        const position = (progressBarWidth.value * getCyclePosition()) / 100;
        positionX.value = position;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [cycleDay, cycleLength, progressBarWidth.value]);

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

  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case 'menstrual':
        return theme.colors.phase.menstrual;
      case 'follicular':
        return theme.colors.phase.follicular;
      case 'ovulation':
        return theme.colors.phase.ovulation;
      case 'luteal':
        return theme.colors.phase.luteal;
      default:
        return theme.colors.primary;
    }
  };

  const getPhaseIcon = (phase: string) => {
    const iconSize = theme.spacing.l + theme.spacing.xs;
    switch (phase) {
      case 'menstrual':
        return <Droplets size={iconSize} color={theme.colors.phase.menstrual} />;
      case 'follicular':
        return <Sun size={iconSize} color={theme.colors.phase.follicular} />;
      case 'ovulation':
        return <Heart size={iconSize} color={theme.colors.phase.ovulation} />;
      case 'luteal':
        return <Leaf size={iconSize} color={theme.colors.phase.luteal} />;
      default:
        return <Heart size={iconSize} color={theme.colors.primary} />;
    }
  };

  const getCycleProgressBarColors = (): [string, string] => {
    return theme.colors.gradient.primary;
  };

  const getCyclePosition = () => {
    return (cycleDay / cycleLength) * 100;
  };

  // Local implementation of getPhaseForDay
  const getPhaseForDay = (cycleDay: number, cycleLength: number): string => {
    if (cycleDay <= 5) {
      return 'menstrual';
    } else if (cycleDay <= Math.floor(cycleLength / 2) - 1) {
      return 'follicular';
    } else if (cycleDay === Math.floor(cycleLength / 2)) {
      return 'ovulation';
    } else {
      return 'luteal';
    }
  };

  const updateCycleDayFromPosition = (positionPercent: number) => {
    const newCycleDay = Math.max(
      1,
      Math.min(cycleLength, Math.round((positionPercent / 100) * cycleLength))
    );

    if (newCycleDay !== cycleDay) {
      setCycleDay(newCycleDay);

      // Update phase based on new cycle day
      if (userData) {
        // Calculate the phase based on the new cycle day
        const newPhase = getPhaseForDay(newCycleDay, userData.cycleLength);
        setCurrentPhase(newPhase);
        setPhaseInfo(getPhaseInfo(newPhase));
      }
    }
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: any) => {
      // Store initial position and touch position
      ctx.startX = positionX.value;
      ctx.touchX = event.absoluteX;
    },
    onActive: (event, ctx: any) => {
      // Calculate new position based on absolute movement
      const dx = event.absoluteX - ctx.touchX;
      const newPosition = ctx.startX + dx;

      // Clamp position to progress bar width (0 to progressBarWidth)
      positionX.value = Math.max(
        0,
        Math.min(progressBarWidth.value, newPosition)
      );
    },
    onEnd: (event) => {
      if (progressBarWidth.value > 0) {
        // Calculate percentage position (0-100%)
        const positionPercent =
          (positionX.value / progressBarWidth.value) * 100;
        // Update cycle day based on position
        runOnJS(updateCycleDayFromPosition)(positionPercent);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: positionX.value,
      transform: [{ translateX: -25 }], // Center the indicator (half of its width)
    };
  });

  if (!userData || !currentPhase || !phaseInfo) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView 
          style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
          edges={['left', 'right']}
        >
          <View style={styles.centerContent}>
            <Text style={[styles.loadingText, { color: theme.colors.text.muted }]}>
              Loading your cycle data...
            </Text>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  const daysInPhase = calculateDaysInPhase(
    userData.lastPeriodDate,
    userData.cycleLength,
    currentPhase
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView 
        style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
        edges={['left', 'right']}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.greeting, { color: theme.colors.text.primary }]}>
              Hello, {userData.name || 'there'}!
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
              Let's sync with your cycle today
            </Text>
          </View>

          {/* Cycle Tracker Section */}
          <View style={[styles.cycleTrackerSection, { backgroundColor: theme.colors.background.highlight }]}>
            <Text style={[styles.cycleTrackerTitle, { color: theme.colors.text.primary }]}>Cycle Tracker</Text>

            <View style={styles.cycleInfoRow}>
              <Text style={[styles.cycleInfoText, { color: theme.colors.text.primary }]}>Today</Text>
              <Text style={[styles.cycleInfoSeparator, { color: theme.colors.text.light }]}>|</Text>
              <Text style={[styles.cycleInfoText, { color: theme.colors.text.primary }]}>Day {cycleDay}</Text>
              <Text style={[styles.cycleInfoSeparator, { color: theme.colors.text.light }]}>|</Text>
              <Text style={[styles.cycleInfoText, { color: theme.colors.text.primary }]}>
                {phaseInfo.name} {currentPhase === 'luteal' ? 'Fall' : 'Phase'}
              </Text>
            </View>

            <Text style={[styles.cycleMessage, { color: theme.colors.text.secondary }]}>
              You're steady and productive; enjoy the slower pace.
            </Text>

            {/* Phase Labels */}
            <View style={styles.phaseLabelsContainer}>
              <View style={styles.phaseLabel}>
                <View
                  style={[
                    styles.phaseDot,
                    { backgroundColor: theme.colors.phase.luteal },
                  ]}
                />
                <Text style={[styles.phaseLabelText, { color: theme.colors.text.secondary }]}>Luteal</Text>
              </View>
              <View style={styles.phaseLabel}>
                <View
                  style={[
                    styles.phaseDot,
                    { backgroundColor: theme.colors.phase.menstrual },
                  ]}
                />
                <Text style={[styles.phaseLabelText, { color: theme.colors.text.secondary }]}>Menstruation</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View
              style={[styles.progressBarContainer, { backgroundColor: theme.colors.text.light }]}
              onLayout={(event) => {
                const width = event.nativeEvent.layout.width;
                progressBarWidth.value = width;
                // Initialize position based on cycle day
                positionX.value = (width * getCyclePosition()) / 100;
              }}
            >
              <LinearGradient
                colors={getCycleProgressBarColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressBar}
              />

              {/* Current Position Indicator - Always Draggable */}
              <PanGestureHandler
                onGestureEvent={onGestureEvent}
                activeOffsetX={[-10, 10]}
              >
                <Animated.View
                  style={[styles.positionIndicator, animatedStyle]}
                >
                  <View style={[
                    styles.iconCircle, 
                    styles.draggableIndicator, 
                    { 
                      backgroundColor: theme.colors.background.card,
                      ...theme.shadows.medium
                    }
                  ]}>
                    {getPhaseIcon(currentPhase)}
                  </View>
                </Animated.View>
              </PanGestureHandler>
            </View>
          </View>

          {/* Today's Recommendations */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Today's Recommendations</Text>

            {/* Workout Card */}
            <View style={[
              styles.recommendationCard, 
              { 
                backgroundColor: theme.colors.background.card,
                ...theme.shadows.small
              }
            ]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>🏃‍♀️ Workout</Text>
                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    completedTasks.has('workout') && styles.completedButton,
                  ]}
                  onPress={() => handleTaskComplete('workout', 5)}
                  disabled={completedTasks.has('workout')}
                >
                  <CheckCircle
                    size={theme.spacing.l}
                    color={
                      completedTasks.has('workout')
                        ? theme.colors.status.success
                        : theme.colors.text.light
                    }
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.cardContent, { color: theme.colors.text.muted }]}>{phaseInfo.workout}</Text>
            </View>

            {/* Nutrition Card */}
            <View style={[
              styles.recommendationCard, 
              { 
                backgroundColor: theme.colors.background.card,
                ...theme.shadows.small
              }
            ]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>🍽️ Nutrition Focus</Text>
                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    completedTasks.has('nutrition') && styles.completedButton,
                  ]}
                  onPress={() => handleTaskComplete('nutrition', 3)}
                  disabled={completedTasks.has('nutrition')}
                >
                  <CheckCircle
                    size={theme.spacing.l}
                    color={
                      completedTasks.has('nutrition')
                        ? theme.colors.status.success
                        : theme.colors.text.light
                    }
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.cardContent, { color: theme.colors.text.muted }]}>{phaseInfo.nutrition}</Text>
            </View>

            {/* Recovery Card */}
            <View style={[
              styles.recommendationCard, 
              { 
                backgroundColor: theme.colors.background.card,
                ...theme.shadows.small
              }
            ]}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>🧘‍♀️ Self-Care</Text>
                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    completedTasks.has('recovery') && styles.completedButton,
                  ]}
                  onPress={() => handleTaskComplete('recovery', 2)}
                  disabled={completedTasks.has('recovery')}
                >
                  <CheckCircle
                    size={theme.spacing.l}
                    color={
                      completedTasks.has('recovery')
                        ? theme.colors.status.success
                        : theme.colors.text.light
                    }
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.cardContent, { color: theme.colors.text.muted }]}>{phaseInfo.recovery}</Text>
            </View>
          </View>

          {/* Progress Summary */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Your Progress</Text>
            <View style={[
              styles.progressCard, 
              { 
                backgroundColor: theme.colors.background.card,
                ...theme.shadows.small
              }
            ]}>
              <View style={styles.progressRow}>
                <Text style={[styles.progressLabel, { color: theme.colors.text.muted }]}>Total Points</Text>
                <Text style={[styles.progressValue, { color: theme.colors.primary }]}>
                  {userData.totalPoints || 0}
                </Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={[styles.progressLabel, { color: theme.colors.text.muted }]}>Current Level</Text>
                <Text style={[styles.progressValue, { color: theme.colors.primary }]}>
                  Level {Math.floor((userData.totalPoints || 0) / 100) + 1}
                </Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={[styles.progressLabel, { color: theme.colors.text.muted }]}>Tasks Today</Text>
                <Text style={[styles.progressValue, { color: theme.colors.primary }]}>
                  {completedTasks.size}/3
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  header: {
    padding: 24,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  cycleTrackerSection: {
    padding: 24,
    marginHorizontal: 24,
    marginTop: 10,
    borderRadius: 16,
  },
  cycleTrackerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  cycleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cycleInfoText: {
    fontSize: 20,
    fontWeight: '600',
  },
  cycleInfoSeparator: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  cycleMessage: {
    fontSize: 18,
    marginBottom: 24,
  },
  phaseLabelsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phaseLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  phaseLabelText: {
    fontSize: 16,
  },
  progressBarContainer: {
    height: 16,
    borderRadius: 8,
    marginBottom: 16,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 8,
    width: '100%',
  },
  positionIndicator: {
    position: 'absolute',
    top: -16,
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableIndicator: {
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
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
  },
  cardContent: {
    fontSize: 14,
    lineHeight: 21,
  },
  completeButton: {
    padding: 4,
  },
  completedButton: {
    opacity: 0.6,
  },
  progressCard: {
    padding: 16,
    borderRadius: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 16,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});