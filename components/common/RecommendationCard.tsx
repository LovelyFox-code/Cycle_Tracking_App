// components/common/RecommendationCard.tsx
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { CircleCheck } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, shadows } from '@/styles/theme';
import Card from './Card';

type RecommendationCardProps = {
  title: string;
  content: string;
  icon?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function RecommendationCard({
  title,
  content,
  icon,
  isCompleted = false,
  onComplete,
  style,
  disabled = false,
}: RecommendationCardProps) {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>
          {icon && `${icon} `}{title}
        </Text>
        {onComplete && (
          <TouchableOpacity
            style={[
              styles.completeButton,
              isCompleted && styles.completedButton,
            ]}
            onPress={onComplete}
            disabled={disabled || isCompleted}
          >
            <CircleCheck
              size={20}
              color={isCompleted ? colors.status.success : colors.text.light}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.cardContent}>{content}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.m,
    ...shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  cardTitle: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  cardContent: {
    fontSize: typography.fontSize.s,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.s,
  },
  completeButton: {
    padding: spacing.xs,
  },
  completedButton: {
    opacity: 0.6,
  },
});