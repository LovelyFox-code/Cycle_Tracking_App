// theme/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, brandATheme } from '@/styles/theme';
import { Theme, ThemeMode, BrandVariant, ThemeContextType } from '@/styles/types';

// Constants for storage keys
const THEME_MODE_STORAGE_KEY = '@cyclesync_theme_mode';
const BRAND_VARIANT_STORAGE_KEY = '@cyclesync_brand_variant';

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeMode: 'light',
  brandVariant: 'default',
  setThemeMode: () => {},
  setBrandVariant: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [brandVariant, setBrandVariantState] = useState<BrandVariant>('default');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  // Load saved theme preferences on initial render
  useEffect(() => {
    const loadThemePreferences = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_STORAGE_KEY);
        const savedBrandVariant = await AsyncStorage.getItem(BRAND_VARIANT_STORAGE_KEY);
        
        if (savedThemeMode) {
          setThemeModeState(savedThemeMode as ThemeMode);
        }
        
        if (savedBrandVariant) {
          setBrandVariantState(savedBrandVariant as BrandVariant);
        }
      } catch (error) {
        console.error('Error loading theme preferences:', error);
      }
    };
    
    loadThemePreferences();
  }, []);

  // Update theme whenever themeMode or brandVariant changes
  useEffect(() => {
    let selectedTheme: Theme;
    
    // First, select theme based on mode
    if (themeMode === 'dark') {
      selectedTheme = darkTheme;
    } else {
      // For light mode, check brand variant
      if (brandVariant === 'brandA') {
        selectedTheme = brandATheme;
      } else {
        selectedTheme = lightTheme;
      }
    }
    
    setTheme(selectedTheme);
  }, [themeMode, brandVariant]);

  // Set theme mode and persist to storage
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  // Set brand variant and persist to storage
  const setBrandVariant = async (variant: BrandVariant) => {
    try {
      await AsyncStorage.setItem(BRAND_VARIANT_STORAGE_KEY, variant);
      setBrandVariantState(variant);
    } catch (error) {
      console.error('Error saving brand variant:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        brandVariant,
        setThemeMode,
        setBrandVariant,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};