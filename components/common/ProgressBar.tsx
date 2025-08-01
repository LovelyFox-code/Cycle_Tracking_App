// components/common/ProgressBar.tsx
import { View, StyleSheet, ViewStyle, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius } from '@/styles/theme';

type ProgressBarProps = {
  progress?: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  progressColors?: ColorValue[];
  style?: ViewStyle;
  children?: React.ReactNode;
};

export default function ProgressBar({
  progress = 100,
  height = 16,
  backgroundColor = colors.background.card,
  progressColors = [colors.primary],
  style,
  children,
}: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor },
        style,
      ]}
    >
      <LinearGradient
        colors={progressColors.length > 1 ? progressColors as [ColorValue, ColorValue, ...ColorValue[]] : [progressColors[0], progressColors[0]] as [ColorValue, ColorValue, ...ColorValue[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.progressBar,
          { width: `${clampedProgress}%` },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: borderRadius.m,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: borderRadius.m,
  },
});