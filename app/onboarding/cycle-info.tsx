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
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

// Helper function to calculate days difference between two dates
const calculateDaysDiff = (date1: Date, date2: Date): number => {
  return Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
};

export default function CycleInfoScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState(28);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    // const lastDay = new Date(currentYear, currentMonth + 1, 0); // Unused variable
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Only show dates from the past 35 days
      const daysDiff = calculateDaysDiff(new Date(today), new Date(date));

      if (daysDiff >= 0 && daysDiff <= 35) {
        days.push(date);
      }
    }
    return days.filter((date) => date.getMonth() === currentMonth);
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date: Date) => {
    const daysDiff = calculateDaysDiff(today, date);

    if (daysDiff >= 0 && daysDiff <= 35) {
      setSelectedDate(date);
    }
  };

  const handleContinue = () => {
    if (!selectedDate) {
      Alert.alert(
        'Please select a date',
        'Choose the first day of your last period to continue.'
      );
      return;
    }

    // Save cycle info to async storage or pass to next screen
    const cycleData = {
      lastPeriodDate: selectedDate.toISOString(),
      cycleLength: cycleLength,
    };

    router.push({
      pathname: '/onboarding/goals',
      params: cycleData,
    });
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFE5E5', '#FAFAFA']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.step}>Step 1 of 3</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Calendar size={32} color="#FF6B6B" />
              <Text style={styles.title}>Tell us about your cycle</Text>
              <Text style={styles.subtitle}>
                When was the first day of your last period? This helps us
                personalize your experience.
              </Text>
            </View>

            {/* Calendar */}
            <View style={styles.calendarContainer}>
              <Text style={styles.monthTitle}>
                {monthNames[currentMonth]} {currentYear}
              </Text>

              <View style={styles.calendar}>
                <View style={styles.dayHeaders}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day) => (
                      <Text key={day} style={styles.dayHeader}>
                        {day}
                      </Text>
                    )
                  )}
                </View>

                <View style={styles.calendarGrid}>
                  {calendarDays.map((date, index) => {
                    const isSelected =
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString();
                    const isToday =
                      date.toDateString() === today.toDateString();
                    const daysDiff = calculateDaysDiff(today, date);
                    const isSelectable = daysDiff >= 0 && daysDiff <= 35;

                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dayButton,
                          isSelected && styles.selectedDay,
                          isToday && styles.todayDay,
                          !isSelectable && styles.disabledDay,
                        ]}
                        onPress={() => handleDateSelect(date)}
                        disabled={!isSelectable}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            isSelected && styles.selectedDayText,
                            isToday && styles.todayText,
                            !isSelectable && styles.disabledDayText,
                          ]}
                        >
                          {date.getDate()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Cycle Length */}
            <View style={styles.cycleLengthContainer}>
              <Text style={styles.cycleLengthTitle}>
                Average cycle length (days)
              </Text>
              <View style={styles.cycleLengthButtons}>
                {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map((length) => (
                  <TouchableOpacity
                    key={length}
                    style={[
                      styles.lengthButton,
                      cycleLength === length && styles.selectedLength,
                    ]}
                    onPress={() => setCycleLength(length)}
                  >
                    <Text
                      style={[
                        styles.lengthText,
                        cycleLength === length && styles.selectedLengthText,
                      ]}
                    >
                      {length}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Continue Button */}
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
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  calendar: {
    // Calendar styles
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
  dayButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDay: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
  },
  todayDay: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 20,
  },
  disabledDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: '#1F2937',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  todayText: {
    fontWeight: '700',
    color: '#FF6B6B',
  },
  disabledDayText: {
    color: '#9CA3AF',
  },
  cycleLengthContainer: {
    marginBottom: 32,
  },
  cycleLengthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  cycleLengthButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  lengthButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 48,
    alignItems: 'center',
  },
  selectedLength: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  lengthText: {
    fontSize: 16,
    color: '#6B7280',
  },
  selectedLengthText: {
    color: '#FFFFFF',
    fontWeight: '600',
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
