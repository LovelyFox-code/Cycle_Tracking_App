import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '@/styles/theme';

type SectionTitleProps = {
  title: string;
  style?: TextStyle;
  color?: string;
  size?: 'small' | 'medium' | 'large';
};

export default function SectionTitle({
  title,
  style,
  color = colors.text.primary,
  size = 'medium',
}: SectionTitleProps) {
  const titleStyles = [styles.title, styles[`${size}Title`], { color }, style];

  return <Text style={titleStyles}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontWeight: typography.fontWeight.bold,
    marginBottom: 16,
  },
  smallTitle: {
    fontSize: typography.fontSize.l,
  },
  mediumTitle: {
    fontSize: typography.fontSize.xl,
  },
  largeTitle: {
    fontSize: typography.fontSize.xxl,
  },
});
