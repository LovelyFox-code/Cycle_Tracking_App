import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/styles/theme';
import React from 'react';

type IconProps = {
  icon: React.ReactNode;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  circle?: boolean;
};

export default function Icon({
  icon,
  size = 24,
  color = colors.text.primary,
  backgroundColor,
  style,
  circle = false,
}: IconProps) {
  // Clone the icon element with the specified size and color
  const iconElement = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        ...(typeof icon.props === 'object' && icon.props !== null
          ? icon.props
          : {}),
        ...(icon.type && (icon.type as any).defaultProps?.size !== undefined
          ? { size }
          : {}),
        ...(icon.type && (icon.type as any).defaultProps?.color !== undefined
          ? { color }
          : {}),
      })
    : null;

  const containerStyles = [
    circle && styles.circle,
    circle && { width: size * 2, height: size * 2 },
    backgroundColor && { backgroundColor },
    style,
  ];

  return <View style={containerStyles}>{iconElement}</View>;
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
