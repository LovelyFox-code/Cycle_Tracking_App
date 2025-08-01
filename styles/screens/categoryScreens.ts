// styles/screens/categoryScreens.ts
import { StyleSheet } from 'react-native';
import { colors, shadows, spacing } from '../theme';

export const categoryScreenStyles = StyleSheet.create({
  // Container and layout styles
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
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
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.muted,
  },
  
  // List styles
  cardList: {
    marginBottom: 20,
  },
  
  // Card styles
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${colors.primary}10`,
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
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.text.muted,
  },
  
  // Points container
  pointsContainer: {
    backgroundColor: `${colors.text.light}20`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  
  // Premium badge
  premiumBadge: {
    backgroundColor: `${colors.status.warning}30`,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
  },
  
  // Empty state
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.text.light,
    textAlign: 'center',
  },
});