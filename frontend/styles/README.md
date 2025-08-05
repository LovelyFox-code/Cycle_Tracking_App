# Styles Directory

This directory contains shared styles for the application, organized by their purpose.

## Structure

```
/styles
  /screens           # Screen-specific shared styles
    categoryScreens.ts  # Shared styles for category screens (fitness, nutrition, recovery)
    index.ts           # Exports for easier imports
  theme.ts           # Global theme variables (colors, spacing, typography, etc.)
```

## Usage

### Theme Variables

Import theme variables to use consistent styling across the app:

```tsx
import { colors, spacing, typography, borderRadius, shadows } from '@/styles/theme';

// Example usage
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
    padding: spacing.m,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
});
```

### Shared Screen Styles

Import shared styles for screens with similar layouts:

```tsx
import { categoryScreenStyles as styles } from '@/styles/screens';

// Use directly in your component
<View style={styles.container}>
  <Text style={styles.title}>Screen Title</Text>
</View>
```

## Benefits

1. **Consistency**: Ensures consistent styling across the app
2. **Maintainability**: Changes to styles can be made in one place
3. **Reduced duplication**: Avoids repeating the same style definitions
4. **Better organization**: Keeps related styles together

## Adding New Shared Styles

When creating new shared styles:

1. Identify common patterns across multiple screens
2. Extract the styles into a new file in the appropriate subdirectory
3. Export the styles through the index.ts file
4. Update the screens to use the shared styles