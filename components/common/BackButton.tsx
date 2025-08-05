import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

type BackButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
  color?: string;
  size?: number;
};

export default function BackButton({
  onPress,
  style,
  color,
  size = 24,
}: BackButtonProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.backButton, 
        {
          backgroundColor: `${theme.colors.background.card}E6`,
          ...theme.shadows.small,
        },
        style
      ]} 
      onPress={handlePress}
    >
      <ArrowLeft size={size} color={color || theme.colors.text.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
