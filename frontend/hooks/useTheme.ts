// hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '@/theme/ThemeContext';

/**
 * Custom hook to access the current theme and theme management functions
 * 
 * @returns {Object} Theme context containing:
 *   - theme: The current theme object with colors, typography, etc.
 *   - themeMode: Current theme mode ('light' or 'dark')
 *   - brandVariant: Current brand variant ('default', 'brandA', etc.)
 *   - setThemeMode: Function to change theme mode
 *   - setBrandVariant: Function to change brand variant
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default useTheme;