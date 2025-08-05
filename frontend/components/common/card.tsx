import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, borderRadius, shadows } from '@/styles/theme';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  borderRadius?: number;
};

export default function Card({
  children,
  style,
  elevation = 'small',
  backgroundColor = colors.background.card,
  borderRadius: customBorderRadius,
}: CardProps) {
  const cardStyles = [
    styles.card,
    elevation !== 'none' && shadows[elevation],
    {
      backgroundColor,
      borderRadius:
        customBorderRadius !== undefined ? customBorderRadius : borderRadius.l,
    },
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: borderRadius.l,
    backgroundColor: colors.background.card,
  },
});
