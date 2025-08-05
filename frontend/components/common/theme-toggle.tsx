import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Sun, Moon, Palette } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode, BrandVariant } from '@/styles/types';

type ThemeToggleProps = {
  showBrandOptions?: boolean;
};

export default function ThemeToggle({
  showBrandOptions = false,
}: ThemeToggleProps) {
  const { theme, themeMode, brandVariant, setThemeMode, setBrandVariant } =
    useTheme();

  const toggleTheme = () => {
    const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const selectBrandVariant = (variant: BrandVariant) => {
    setBrandVariant(variant);
  };

  return (
    <View style={styles.container}>
      <View style={styles.themeToggleRow}>
        <View style={styles.iconLabelContainer}>
          {themeMode === 'light' ? (
            <Sun size={24} color={theme.colors.text.primary} />
          ) : (
            <Moon size={24} color={theme.colors.text.primary} />
          )}
          <Text style={[styles.label, { color: theme.colors.text.primary }]}>
            {themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </View>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{
            false: theme.colors.text.light,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.background.card}
        />
      </View>

      {showBrandOptions && (
        <View style={styles.brandOptions}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Brand Theme
          </Text>

          <TouchableOpacity
            style={[
              styles.brandOption,
              brandVariant === 'default' && styles.selectedBrandOption,
              { borderColor: theme.colors.primary },
            ]}
            onPress={() => selectBrandVariant('default')}
          >
            <Palette size={20} color={theme.colors.text.primary} />
            <Text
              style={[
                styles.brandOptionText,
                { color: theme.colors.text.primary },
              ]}
            >
              Default
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.brandOption,
              brandVariant === 'brandA' && styles.selectedBrandOption,
              { borderColor: theme.colors.primary },
            ]}
            onPress={() => selectBrandVariant('brandA')}
          >
            <Palette size={20} color={theme.colors.text.primary} />
            <Text
              style={[
                styles.brandOptionText,
                { color: theme.colors.text.primary },
              ]}
            >
              Brand A
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  themeToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  brandOptions: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  brandOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  selectedBrandOption: {
    borderWidth: 2,
  },
  brandOptionText: {
    marginLeft: 12,
    fontSize: 16,
  },
});
