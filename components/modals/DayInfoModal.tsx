// components/modals/DayInfoModal.tsx
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { X } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography, shadows } from '@/styles/theme';
import Button from '../common/Button';

type DayInfoModalProps = {
  visible: boolean;
  onClose: () => void;
  date: Date;
  cycleDay: number;
  phase: string | null;
  phaseInfo: any;
};

export default function DayInfoModal({
  visible,
  onClose,
  date,
  cycleDay,
  phase,
  phaseInfo,
}: DayInfoModalProps) {
  if (!phase || !phaseInfo) {
    return null;
  }

  const getPhaseColor = (phase: string) => {
    return colors.phase[phase] || colors.primary;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={40} style={styles.overlay} tint="dark">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={colors.text.muted} />
            </TouchableOpacity>

            <View
              style={[
                styles.phaseIndicator,
                { backgroundColor: getPhaseColor(phase) },
              ]}
            />

            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Text style={styles.cycleText}>Cycle Day {cycleDay}</Text>
            <Text style={styles.phaseText}>{phaseInfo.name} Phase</Text>

            <Text style={styles.sectionTitle}>How you might feel</Text>
            <Text style={styles.descriptionText}>{phaseInfo.message}</Text>

            <Text style={styles.sectionTitle}>Recommendations</Text>
            
            <View style={styles.recommendationSection}>
              <Text style={styles.recommendationTitle}>🏃‍♀️ Workout</Text>
              <Text style={styles.recommendationText}>{phaseInfo.workout}</Text>
            </View>

            <View style={styles.recommendationSection}>
              <Text style={styles.recommendationTitle}>🍽️ Nutrition</Text>
              <Text style={styles.recommendationText}>{phaseInfo.nutrition}</Text>
            </View>

            <View style={styles.recommendationSection}>
              <Text style={styles.recommendationTitle}>🧘‍♀️ Self-Care</Text>
              <Text style={styles.recommendationText}>{phaseInfo.recovery}</Text>
            </View>

            <Button
              title="Close"
              onPress={onClose}
              variant="primary"
              fullWidth
              style={styles.button}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    ...shadows.large,
  },
  modalContent: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 10,
    padding: spacing.xs,
  },
  phaseIndicator: {
    width: 80,
    height: 8,
    borderRadius: borderRadius.round,
    marginBottom: spacing.m,
  },
  dateText: {
    fontSize: typography.fontSize.l,
    color: colors.text.muted,
    marginBottom: spacing.xs,
  },
  cycleText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  phaseText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginBottom: spacing.l,
  },
  sectionTitle: {
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.s,
    marginTop: spacing.l,
  },
  descriptionText: {
    fontSize: typography.fontSize.m,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.m,
    marginBottom: spacing.m,
  },
  recommendationSection: {
    marginBottom: spacing.m,
  },
  recommendationTitle: {
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  recommendationText: {
    fontSize: typography.fontSize.m,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.m,
  },
  button: {
    marginTop: spacing.xl,
  },
});