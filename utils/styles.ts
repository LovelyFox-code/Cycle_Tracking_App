import { StyleProp, TextStyle, ViewStyle, ImageStyle } from 'react-native';

/**
 * Utility function to safely combine styles of any type into a properly typed StyleProp
 * This helps TypeScript understand that partial style objects are valid in style arrays
 */
export function combineStyles<T extends ViewStyle | TextStyle | ImageStyle>(
  ...styles: (StyleProp<T> | Record<string, any> | undefined | false)[]
): StyleProp<T> {
  return styles.filter(Boolean) as StyleProp<T>;
}

/**
 * Specifically for Text components that might receive ViewStyle properties
 */
export function combineTextStyles(
  ...styles: (StyleProp<TextStyle> | StyleProp<ViewStyle> | Record<string, any> | undefined | false)[]
): StyleProp<TextStyle> {
  return styles.filter(Boolean) as StyleProp<TextStyle>;
}