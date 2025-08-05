import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/styles/theme';
import { combineStyles, combineTextStyles } from '@/utils/styles';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const buttonStyles = combineStyles<ViewStyle>(
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabledButton,
    style
  );

  const textStyles = combineTextStyles(
    styles.buttonText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      <Text style={textStyles}>{title}</Text>
      {icon && iconPosition === 'right' && icon}
    </>
  );

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.m,
    gap: spacing.s,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.m,
  },
  mediumButton: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
  },
  largeButton: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xl,
  },
  disabledButton: {
    backgroundColor: colors.text.light,
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '600', // Using direct value instead of typography.fontWeight.semibold
  },
  primaryText: {
    color: colors.background.card,
  },
  secondaryText: {
    color: colors.background.card,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
  smallText: {
    fontSize: typography.fontSize.s,
  },
  mediumText: {
    fontSize: typography.fontSize.m,
  },
  largeText: {
    fontSize: typography.fontSize.l,
  },
  disabledText: {
    color: colors.background.card,
  },
});
