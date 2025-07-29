import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, Droplets, Sun, Heart, Moon } from 'lucide-react-native';
import { getUserData } from '@/utils/storage';
import { getCurrentPhase, getPhaseForDay, calculateCycleDay } from '@/utils/cycleCalculations';

export default function CycleScreen() {
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

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
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41); // 6 weeks

    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
      const cycleDay = calculateCycleDay(new Date(userData.lastPeriodDate), userData.cycleLength, new Date(date));
      const phase = cycleDay > 0 ? getPhaseForDay(cycleDay, userData.cycleLength) : null;
      
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

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'menstrual': return '#FF6B6B';
      case 'follicular': return '#FFD93D';
      case 'ovulation': return '#FF1744';
      case 'luteal': return '#8E24AA';
      default: return '#E5E7EB';
    }
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'menstrual': return <Droplets size={16} color="#FFFFFF" />;
      case 'follicular': return <Sun size={16} color="#FFFFFF" />;
      case 'ovulation': return <Heart size={16} color="#FFFFFF" />;
      case 'luteal': return <Moon size={16} color="#FFFFFF" />;
      default: return null;
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!userData) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading cycle data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentPhase = getCurrentPhase(userData.lastPeriodDate, userData.cycleLength);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>       
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cycle Calendar</Text>
          <Text style={styles.subtitle}>Track your phases and patterns</Text>
        </View>

        {/* Current Phase Info */}
        <LinearGradient
          colors={['#FFE5E5', '#FFCCCB']}
          style={styles.currentPhaseCard}
        >
          <View style={styles.phaseRow}>
            {getPhaseIcon(currentPhase)}
            <Text style={styles.currentPhaseText}>{currentPhase?.charAt(0).toUpperCase() + currentPhase?.slice(1)} Phase</Text>
          </View>
          <Text style={styles.cycleInfo}>Cycle Length: {userData.cycleLength} days</Text>
        </LinearGradient>

        {/* Calendar Navigation */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.navButton}>
            <ChevronLeft size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.navButton}>
            <ChevronRight size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendar}>
          {/* Day headers */}
          <View style={styles.dayHeaders}>
            {dayNames.map((day) => (
              <Text key={day} style={styles.dayHeader}>{day}</Text>
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
                    day.isToday && styles.todayCircle,
                    !day.isCurrentMonth && styles.otherMonth,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      day.phase && styles.phaseText,
                      !day.isCurrentMonth && styles.otherMonthText,
                      day.isToday && styles.todayText,
                    ]}
                  >
                    {day.date.getDate()}
                  </Text>
                </View>
                {day.cycleDay > 0 && day.isCurrentMonth && (
                  <Text style={styles.cycleDayText}>C{day.cycleDay}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Phase Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Phase Legend</Text>
          <View style={styles.legendGrid}>
            {[
              { phase: 'menstrual', name: 'Menstrual', icon: <Droplets size={16} color="#FFFFFF" /> },
              { phase: 'follicular', name: 'Follicular', icon: <Sun size={16} color="#FFFFFF" /> },
              { phase: 'ovulation', name: 'Ovulation', icon: <Heart size={16} color="#FFFFFF" /> },
              { phase: 'luteal', name: 'Luteal', icon: <Moon size={16} color="#FFFFFF" /> },
            ].map((item) => (
              <View key={item.phase} style={styles.legendItem}>
                <View style={[styles.legendCircle, { backgroundColor: getPhaseColor(item.phase) }]}>
                  {item.icon}
                </View>
                <Text style={styles.legendText}>{item.name}</Text>
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
    backgroundColor: '#FAFAFA',
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  currentPhaseCard: {
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
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPhaseText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  cycleInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  monthYear: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  calendar: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    color: '#6B7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%',
    alignItems: 'center',
    marginBottom: 12,
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
    borderColor: '#FF6B6B',
  },
  otherMonth: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  phaseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  otherMonthText: {
    color: '#9CA3AF',
  },
  todayText: {
    fontWeight: '700',
  },
  cycleDayText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  legend: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
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
    marginBottom: 12,
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
    color: '#6B7280',
  },
});