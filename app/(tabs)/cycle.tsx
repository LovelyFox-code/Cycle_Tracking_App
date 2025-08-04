import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Sun,
  Heart,
  Moon,
} from 'lucide-react-native';
import { getUserData } from '@/utils/storage';
import {
  getCurrentPhase,
  getPhaseForDay,
  calculateCycleDay,
} from '@/utils/cycleCalculations';
import { useTheme } from '@/hooks/useTheme';

type UserData = {
  lastPeriodDate: string;
  cycleLength: number;
  // add other properties if needed
};

export default function CycleScreen() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  type CalendarDay = {
    date: Date;
    cycleDay: number;
    phase: string | null;
    isCurrentMonth: boolean;
    isToday: boolean;
  };

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      generateCalendarDays();
    }
  }, [userData, currentDate]);

  const loadUserData = async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
    }
  };

  const generateCalendarDays = () => {
    if (!userData) {
      setCalendarDays([]);
      return;
    }
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41); // 6 weeks

    for (
      let date = new Date(startDate);
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const cycleDay = calculateCycleDay(
        new Date(userData.lastPeriodDate),
        userData.cycleLength,
        new Date(date)
      );
      const phase =
        cycleDay > 0 ? getPhaseForDay(cycleDay, userData.cycleLength) : null;

      days.push({
        date: new Date(date),
        cycleDay,
        phase,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString(),
      });
    }

    setCalendarDays(days);
  };

  const getPhaseColor = (phase: string) => {
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
        return theme.colors.text.light;
    }
  };

  const getPhaseIcon = (phase: string) => {
    const iconSize = theme.typography.fontSize.xl;
    const iconColor = theme.colors.background.card;

    switch (phase) {
      case 'menstrual':
        return <Droplets size={iconSize} color={iconColor} />;
      case 'follicular':
        return <Sun size={iconSize} color={iconColor} />;
      case 'ovulation':
        return <Heart size={iconSize} color={iconColor} />;
      case 'luteal':
        return <Moon size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!userData) {
    return (
      <SafeAreaView 
        style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
        edges={['left', 'right']}
      >
        <View style={styles.centerContent}>
          <Text style={[styles.loadingText, { color: theme.colors.text.muted }]}>
            Loading cycle data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentPhase = getCurrentPhase(
    userData.lastPeriodDate,
    userData.cycleLength
  );

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
      edges={['left', 'right']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Cycle Calendar</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>Track your phases and patterns</Text>
        </View>

        {/* Current Phase Info */}
        <LinearGradient
          colors={[theme.colors.background.highlight, theme.colors.background.highlight]}
          style={[styles.currentPhaseCard, { ...theme.shadows.medium }]}
        >
          <View style={styles.phaseRow}>
            {getPhaseIcon(currentPhase)}
            <Text style={[styles.currentPhaseText, { color: theme.colors.text.primary }]}>
              {currentPhase?.charAt(0).toUpperCase() + currentPhase?.slice(1)}{' '}
              Phase
            </Text>
          </View>
          <Text style={[styles.cycleInfo, { color: theme.colors.text.muted }]}>
            Cycle Length: {userData.cycleLength} days
          </Text>
        </LinearGradient>

        {/* Calendar Navigation */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => navigateMonth(-1)}
            style={[styles.navButton, { 
              backgroundColor: theme.colors.background.card,
              ...theme.shadows.small
            }]}
          >
            <ChevronLeft size={24} color={theme.colors.text.muted} />
          </TouchableOpacity>
          <Text style={[styles.monthYear, { color: theme.colors.text.primary }]}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity
            onPress={() => navigateMonth(1)}
            style={[styles.navButton, { 
              backgroundColor: theme.colors.background.card,
              ...theme.shadows.small
            }]}
          >
            <ChevronRight size={24} color={theme.colors.text.muted} />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={[styles.calendar, { 
          backgroundColor: theme.colors.background.card,
          ...theme.shadows.medium
        }]}>
          {/* Day headers */}
          <View style={styles.dayHeaders}>
            {dayNames.map((day) => (
              <Text key={day} style={[styles.dayHeader, { color: theme.colors.text.muted }]}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar days */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View
                  style={[
                    styles.dayCircle,
                    day.phase && { backgroundColor: getPhaseColor(day.phase) },
                    day.isToday && [styles.todayCircle, { borderColor: theme.colors.primary }],
                    !day.isCurrentMonth && styles.otherMonth,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      { color: theme.colors.text.primary },
                      day.phase && [styles.phaseText, { color: theme.colors.background.card }],
                      !day.isCurrentMonth && [styles.otherMonthText, { color: theme.colors.text.light }],
                      day.isToday && styles.todayText,
                    ]}
                  >
                    {day.date.getDate()}
                  </Text>
                </View>
                {day.cycleDay > 0 && day.isCurrentMonth && (
                  <Text style={[styles.cycleDayText, { color: theme.colors.text.muted }]}>
                    C{day.cycleDay}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Phase Legend */}
        <View style={[styles.legend, { 
          backgroundColor: theme.colors.background.card,
          ...theme.shadows.medium
        }]}>
          <Text style={[styles.legendTitle, { color: theme.colors.text.primary }]}>Phase Legend</Text>
          <View style={styles.legendGrid}>
            {[
              {
                phase: 'menstrual',
                name: 'Menstrual',
                icon: <Droplets size={16} color="#FFFFFF" />,
              },
              {
                phase: 'follicular',
                name: 'Follicular',
                icon: <Sun size={16} color="#FFFFFF" />,
              },
              {
                phase: 'ovulation',
                name: 'Ovulation',
                icon: <Heart size={16} color="#FFFFFF" />,
              },
              {
                phase: 'luteal',
                name: 'Luteal',
                icon: <Moon size={16} color="#FFFFFF" />,
              },
            ].map((item) => (
              <View key={item.phase} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendCircle,
                    { backgroundColor: getPhaseColor(item.phase) },
                  ]}
                >
                  {item.icon}
                </View>
                <Text style={[styles.legendText, { color: theme.colors.text.muted }]}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  currentPhaseCard: {
    margin: 24,
    marginTop: 8,
    padding: 24,
    borderRadius: 16,
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPhaseText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  cycleInfo: {
    fontSize: 14,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: '700',
  },
  calendar: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  todayCircle: {
    borderWidth: 2,
  },
  otherMonth: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
  },
  phaseText: {
    fontWeight: '600',
  },
  otherMonthText: {
    color: '#9CA3AF',
  },
  todayText: {
    fontWeight: '700',
  },
  cycleDayText: {
    fontSize: 12,
    marginTop: 2,
  },
  legend: {
    margin: 24,
    borderRadius: 16,
    padding: 16,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
});