// components/calendar/CycleTracker.tsx
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Heart, Droplets, Sun, Leaf } from 'lucide-react-native';
import { colors, spacing, typography } from '@/styles/theme';
import Card from '../common/card';
import ProgressBar from '../common/progress-bar';
import Icon from '../common/icon';

type CycleTrackerProps = {
  cycleDay: number;
  cycleLength: number;
  currentPhase: string;
  phaseInfo: any;
  style?: StyleProp<ViewStyle>;
};

export default function CycleTracker({
  cycleDay,
  cycleLength,
  currentPhase,
  phaseInfo,
  style,
}: CycleTrackerProps) {
  type PhaseKey = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

  const isValidPhase = (phase: string): phase is PhaseKey => {
    return ['menstrual', 'follicular', 'ovulation', 'luteal'].includes(phase);
  };

  const getPhaseIcon = (phase: string) => {
    if (isValidPhase(phase)) {
      switch (phase) {
        case 'menstrual':
          return <Droplets size={24} color={colors.phase.menstrual} />;
        case 'follicular':
          return <Sun size={24} color={colors.phase.follicular} />;
        case 'ovulation':
          return <Heart size={24} color={colors.phase.ovulation} />;
        case 'luteal':
          return <Leaf size={24} color={colors.phase.luteal} />;
      }
    }
    return <Heart size={24} color={colors.primary} />;
  };

  const getCycleProgressBarColors = (): string[] => {
    return [
      colors.phase.luteal,
      colors.phase.menstrual,
      colors.phase.follicular,
      colors.phase.ovulation,
    ];
  };

  const getCyclePosition = () => {
    return (cycleDay / cycleLength) * 100;
  };

  return (
    <Card
      style={[styles.container, style]}
      backgroundColor={colors.background.highlight}
    >
      <Text style={styles.title}>Cycle Tracker</Text>

      <View style={styles.cycleInfoRow}>
        <Text style={styles.cycleInfoText}>Today</Text>
        <Text style={styles.cycleInfoSeparator}>|</Text>
        <Text style={styles.cycleInfoText}>Day {cycleDay}</Text>
        <Text style={styles.cycleInfoSeparator}>|</Text>
        <Text style={styles.cycleInfoText}>
          {phaseInfo.name} {currentPhase === 'luteal' ? 'Fall' : 'Phase'}
        </Text>
      </View>

      <Text style={styles.cycleMessage}>{phaseInfo.message}</Text>

      {/* Phase Labels */}
      <View style={styles.phaseLabelsContainer}>
        <View style={styles.phaseLabel}>
          <View
            style={[styles.phaseDot, { backgroundColor: colors.phase.luteal }]}
          />
          <Text style={styles.phaseLabelText}>Luteal</Text>
        </View>
        <View style={styles.phaseLabel}>
          <View
            style={[
              styles.phaseDot,
              { backgroundColor: colors.phase.menstrual },
            ]}
          />
          <Text style={styles.phaseLabelText}>Menstruation</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progressColors={getCycleProgressBarColors()}
          progress={100} // Always show full bar with colors
        />

        {/* Current Position Indicator */}
        <View
          style={[styles.positionIndicator, { left: `${getCyclePosition()}%` }]}
        >
          <View style={styles.iconCircle}>
            <Icon icon={getPhaseIcon(currentPhase)} />
          </View>
        </View>
      </View>
    </Card>
  );
}

type Styles = {
  container: ViewStyle;
  title: TextStyle;
  cycleInfoRow: ViewStyle;
  cycleInfoText: TextStyle;
  cycleInfoSeparator: TextStyle;
  cycleMessage: TextStyle;
  phaseLabelsContainer: ViewStyle;
  phaseLabel: ViewStyle;
  phaseDot: ViewStyle;
  phaseLabelText: TextStyle;
  progressBarContainer: ViewStyle;
  positionIndicator: ViewStyle;
  iconCircle: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    marginHorizontal: spacing.m,
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.m,
  },
  cycleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  cycleInfoText: {
    fontSize: typography.fontSize.l,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cycleInfoSeparator: {
    fontSize: typography.fontSize.l,
    color: colors.text.light,
    marginHorizontal: spacing.m,
  },
  cycleMessage: {
    fontSize: typography.fontSize.m,
    color: colors.text.secondary,
    marginBottom: spacing.l,
  },
  phaseLabelsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.m,
  },
  phaseLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.l,
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.s,
  },
  phaseLabelText: {
    fontSize: typography.fontSize.m,
    color: colors.text.secondary,
  },
  progressBarContainer: {
    position: 'relative',
    marginBottom: spacing.s,
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
    backgroundColor: colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
