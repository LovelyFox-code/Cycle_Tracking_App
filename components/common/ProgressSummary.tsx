// components/common/ProgressSummary.tsx
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/styles/theme';
import Card from './Card';
import SectionTitle from './SectionTitle';

type ProgressItem = {
  label: string;
  value: string | number;
};

type ProgressSummaryProps = {
  title?: string;
  items: ProgressItem[];
  style?: ViewStyle;
};

export default function ProgressSummary({
  title = 'Your Progress',
  items,
  style,
}: ProgressSummaryProps) {
  return (
    <View style={[styles.container, style]}>
      {title && <SectionTitle title={title} />}

      <Card>
        {items.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.progressRow,
              index < items.length - 1 && styles.borderBottom,
            ]}
          >
            <Text style={styles.progressLabel}>{item.label}</Text>
            <Text style={styles.progressValue}>{item.value}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.m,
  } as ViewStyle,
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  } as ViewStyle,
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.background.main,
  } as ViewStyle,
  progressLabel: {
    fontSize: typography.fontSize.m,
    color: colors.text.muted,
  } as import('react-native').TextStyle,
  progressValue: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  } as import('react-native').TextStyle,
});
