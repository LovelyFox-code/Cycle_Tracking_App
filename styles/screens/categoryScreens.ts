// styles/screens/categoryScreens.ts
import { StyleSheet } from 'react-native';

// We'll create a function that returns styles based on the theme
export const createCategoryScreenStyles = (theme) => StyleSheet.create({
  // Container and layout styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    paddingBottom: 60, // Make room for bottom tabs
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  
  // Header styles
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.muted,
  },
  
  // List styles
  cardList: {
    marginBottom: 20,
  },
  
  // Card styles
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...theme.shadows.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${theme.colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.text.muted,
  },
  
  // Points container
  pointsContainer: {
    backgroundColor: `${theme.colors.text.light}20`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  
  // Premium badge
  premiumBadge: {
    backgroundColor: `${theme.colors.status.warning}30`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.accent,
  },
  
  // Empty state
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.text.light,
    textAlign: 'center',
  },
});