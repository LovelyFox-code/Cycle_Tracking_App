// styles/types.ts
// Theme system type definitions

export type ColorShade = {
  primary: string;
  secondary: string;
  muted: string;
  light: string;
};

export type BackgroundColors = {
  main: string;
  card: string;
  highlight: string;
};

export type StatusColors = {
  success: string;
  warning: string;
  error: string;
};

export type PhaseColors = {
  menstrual: string;
  follicular: string;
  ovulation: string;
  luteal: string;
};

export type GradientPair = [string, string];

export type GradientColors = {
  // Core gradients
  primary: GradientPair;
  secondary: GradientPair;
  accent: GradientPair;
  
  // Purpose-based gradients
  energy: GradientPair;
  calm: GradientPair;
  vitality: GradientPair;
  passion: GradientPair;
  strength: GradientPair;
  
  // Phase-based gradients
  menstrual: GradientPair;
  follicular: GradientPair;
  ovulation: GradientPair;
  luteal: GradientPair;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  purple: string;
  text: ColorShade;
  background: BackgroundColors;
  status: StatusColors;
  phase: PhaseColors;
  gradient: GradientColors;
};

export type Typography = {
  fontSize: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  fontWeight: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
};

export type Spacing = {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type BorderRadius = {
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
  round: number;
};

export type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type Shadows = {
  small: Shadow;
  medium: Shadow;
  large: Shadow;
};

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

export type ThemeMode = 'light' | 'dark';
export type BrandVariant = 'default' | 'brandA' | 'brandB';

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  brandVariant: BrandVariant;
  setThemeMode: (mode: ThemeMode) => void;
  setBrandVariant: (variant: BrandVariant) => void;
}