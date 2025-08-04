// styles/theme.ts
import { 
  Theme, 
  ThemeColors, 
  Typography, 
  Spacing, 
  BorderRadius, 
  Shadows,
  GradientPair
} from './types';

// Light theme colors
export const lightColors: ThemeColors = {
  primary: '#FF6B6B',
  secondary: '#4FC3F7',
  accent: '#F9A826',
  purple: '#8E24AA',
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    muted: '#6B7280',
    light: '#9CA3AF',
  },
  background: {
    main: '#F8F9FA',
    card: '#FFFFFF',
    highlight: '#F5E6DA',
  },
  status: {
    success: '#4CAF50',
    warning: '#FFD93D',
    error: '#FF1744',
  },
  phase: {
    menstrual: '#4FC3F7',
    follicular: '#FFD93D',
    ovulation: '#FF1744',
    luteal: '#8E24AA',
  },
  gradient: {
    // Core gradients
    primary: ['#FF6B6B', '#FF8E53'],
    secondary: ['#667eea', '#764ba2'],
    accent: ['#f093fb', '#f5576c'],
    
    // Purpose-based gradients
    energy: ['#FF6B6B', '#FF8E53'],     // Warm orange - for energy/activity
    calm: ['#667eea', '#764ba2'],       // Blue/purple - for relaxation/mindfulness
    vitality: ['#FFD93D', '#FF6B6B'],   // Yellow/orange - for health/nutrition
    passion: ['#f093fb', '#f5576c'],    // Pink/red - for motivation/intensity
    strength: ['#8E24AA', '#FF1744'],   // Purple/red - for power/achievement
    
    // Phase-based gradients (for cycle phases)
    menstrual: ['#4FC3F7', '#2196F3'],  // Blues
    follicular: ['#FFD93D', '#FFA000'], // Yellows
    ovulation: ['#FF1744', '#D50000'],  // Reds
    luteal: ['#8E24AA', '#6A1B9A']      // Purples
  }
};

// Dark theme colors
export const darkColors: ThemeColors = {
  primary: '#FF8E53',
  secondary: '#64B5F6',
  accent: '#FFB74D',
  purple: '#AB47BC',
  text: {
    primary: '#F9FAFB',
    secondary: '#E5E7EB',
    muted: '#D1D5DB',
    light: '#9CA3AF',
  },
  background: {
    main: '#121212',
    card: '#1E1E1E',
    highlight: '#2D2D2D',
  },
  status: {
    success: '#66BB6A',
    warning: '#FFEE58',
    error: '#FF5252',
  },
  phase: {
    menstrual: '#64B5F6',
    follicular: '#FFEE58',
    ovulation: '#FF5252',
    luteal: '#AB47BC',
  },
  gradient: {
    // Core gradients
    primary: ['#FF8E53', '#FF6B6B'],
    secondary: ['#764ba2', '#667eea'],
    accent: ['#f5576c', '#f093fb'],
    
    // Purpose-based gradients
    energy: ['#FF8E53', '#FF6B6B'],     // Warm orange - for energy/activity
    calm: ['#764ba2', '#667eea'],       // Blue/purple - for relaxation/mindfulness
    vitality: ['#FF6B6B', '#FFD93D'],   // Yellow/orange - for health/nutrition
    passion: ['#f5576c', '#f093fb'],    // Pink/red - for motivation/intensity
    strength: ['#FF1744', '#8E24AA'],   // Purple/red - for power/achievement
    
    // Phase-based gradients (for cycle phases)
    menstrual: ['#2196F3', '#64B5F6'],  // Blues
    follicular: ['#FFA000', '#FFEE58'], // Yellows
    ovulation: ['#D50000', '#FF5252'],  // Reds
    luteal: ['#6A1B9A', '#AB47BC']      // Purples
  }
};

// Brand A theme colors (example of a brand variant)
export const brandAColors: ThemeColors = {
  primary: '#6200EA',
  secondary: '#03DAC6',
  accent: '#FFA000',
  purple: '#9C27B0',
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    muted: '#6B7280',
    light: '#9CA3AF',
  },
  background: {
    main: '#F8F9FA',
    card: '#FFFFFF',
    highlight: '#EDE7F6',
  },
  status: {
    success: '#4CAF50',
    warning: '#FFD93D',
    error: '#FF1744',
  },
  phase: {
    menstrual: '#03DAC6',
    follicular: '#FFA000',
    ovulation: '#FF1744',
    luteal: '#9C27B0',
  },
  gradient: {
    // Core gradients
    primary: ['#6200EA', '#7C4DFF'],
    secondary: ['#03DAC6', '#00B0FF'],
    accent: ['#FFA000', '#FFD600'],
    
    // Purpose-based gradients
    energy: ['#FFA000', '#FFD600'],
    calm: ['#03DAC6', '#00B0FF'],
    vitality: ['#FFD600', '#FFA000'],
    passion: ['#FF1744', '#D50000'],
    strength: ['#9C27B0', '#6200EA'],
    
    // Phase-based gradients
    menstrual: ['#03DAC6', '#00B0FF'],
    follicular: ['#FFA000', '#FFD600'],
    ovulation: ['#FF1744', '#D50000'],
    luteal: ['#9C27B0', '#6200EA']
  }
};

// Shared typography values across themes
export const typography: Typography = {
  fontSize: {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  }
};

// Shared spacing values across themes
export const spacing: Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

// Shared border radius values across themes
export const borderRadius: BorderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

// Light theme shadows
export const lightShadows: Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
};

// Dark theme shadows (slightly different opacity)
export const darkShadows: Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
};

// Complete theme objects
export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  borderRadius,
  shadows: lightShadows
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  borderRadius,
  shadows: darkShadows
};

export const brandATheme: Theme = {
  colors: brandAColors,
  typography,
  spacing,
  borderRadius,
  shadows: lightShadows
};

// Default exports for backward compatibility
export const colors = lightColors;
export const shadows = lightShadows;