import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius } from '@/styles/theme';

type CalendarDayProps = {
  date: Date;
  cycleDay: number;
  phase: string | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

export default function CalendarDay({
  date,
  cycleDay,
  phase,
  isCurrentMonth,
  isToday,
  onPress,
  style,
}: CalendarDayProps) {
  const phaseKeys = ['menstrual', 'follicular', 'ovulation', 'luteal'] as const;
  type PhaseKey = (typeof phaseKeys)[number];

  const getPhaseColor = (phase: string | null) => {
    if (phase && phaseKeys.includes(phase as PhaseKey)) {
      return colors.phase[phase as PhaseKey];
    }
    return colors.primary;
  };

  const dayStyles: ViewStyle[] = [
    styles.day,
    isCurrentMonth ? undefined : styles.otherMonthDay,
    phase ? { backgroundColor: getPhaseColor(phase) + '20' } : undefined, // 20% opacity
    isToday ? styles.today : undefined,
    style,
  ].filter(Boolean) as ViewStyle[];

  const textStyles = [
    styles.dayText,
    !isCurrentMonth ? styles.otherMonthText : undefined,
    isToday ? styles.todayText : undefined,
  ].filter(Boolean) as import('react-native').TextStyle[];

  const cycleDayStyles = [
    styles.cycleDayText,
    !isCurrentMonth ? styles.otherMonthText : undefined,
    isToday ? styles.todayText : undefined,
  ].filter(Boolean) as import('react-native').TextStyle[];

  return (
    <TouchableOpacity style={dayStyles} onPress={onPress}>
      <Text style={textStyles}>{date.getDate()}</Text>
      {cycleDay > 0 && phase && <Text style={cycleDayStyles}>{cycleDay}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  day: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.m,
    margin: 2,
  },
  otherMonthDay: {
    opacity: 0.4,
  },
  today: {
    backgroundColor: colors.primary + '40', // 40% opacity
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dayText: {
    fontSize: typography.fontSize.s,
    fontWeight: '500',
    color: colors.text.primary,
  },
  cycleDayText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    marginTop: -2,
  },
  otherMonthText: {
    color: colors.text.light,
  },
  todayText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
