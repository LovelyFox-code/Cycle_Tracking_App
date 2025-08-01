import { View, Text, StyleSheet } from 'react-native';
import CalendarDay from './CalendarDay';
import { colors, typography, spacing } from '@/styles/theme';

type CalendarDay = {
  date: Date;
  cycleDay: number;
  phase: string | null;
  isCurrentMonth: boolean;
  isToday: boolean;
};

type CalendarGridProps = {
  days: CalendarDay[];
  onDayPress: (day: CalendarDay) => void;
};

export default function CalendarGrid({ days, onDayPress }: CalendarGridProps) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Weekday headers */}
      <View style={styles.weekdayHeader}>
        {weekdays.map((day) => (
          <Text key={day} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            date={day.date}
            cycleDay={day.cycleDay}
            phase={day.phase}
            isCurrentMonth={day.isCurrentMonth}
            isToday={day.isToday}
            onPress={() => onDayPress(day)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.s,
    paddingHorizontal: spacing.xs,
  },
  weekdayText: {
    width: 40,
    textAlign: 'center',
    fontSize: typography.fontSize.s,
    fontWeight: '500',
    color: colors.text.muted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
