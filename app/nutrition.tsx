import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utensils } from 'lucide-react-native';
import { useContext } from 'react';
import { NutritionFilterContext } from '@/app/_layout';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';

export default function NutritionScreen() {
  const { theme } = useTheme();
  const { activeFilter } = useContext(NutritionFilterContext);
  const styles = createCategoryScreenStyles(theme);

  // Filter nutrition items based on the active filter
  const filteredItems = nutritionItems.filter((item) => {
    if (activeFilter === 'vegan') {
      return item.dietType === 'vegan';
    } else if (activeFilter === 'vegetarian') {
      return item.dietType === 'vegetarian';
    } else if (activeFilter === 'pescetarian') {
      return item.dietType === 'pescetarian';
    }
    return true; // Show all when 'all' is selected
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>
            {activeFilter === 'vegan'
              ? 'Vegan meal options'
              : activeFilter === 'vegetarian'
              ? 'Vegetarian meal options'
              : activeFilter === 'pescetarian'
              ? 'Pescetarian meal options'
              : 'All nutrition options'}
          </Text>
        </View>

        <View style={styles.cardList}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => router.push(`/nutrition/${item.slug}`)}
              >
                <View style={styles.iconContainer}>
                  <Utensils size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  {item.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>PREMIUM</Text>
                    </View>
                  )}
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>{item.points} points</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No nutrition items available for this filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const nutritionItems = [
  {
    title: 'Hormone-Balancing Breakfast',
    description: 'Protein-rich morning meal',
    points: 15,
    dietType: 'vegetarian',
    isPremium: false,
    category: 'general',
    slug: 'hormone-balancing-breakfast',
  },
  {
    title: 'Anti-Inflammatory Lunch',
    description: 'Colorful veggies and healthy fats',
    points: 15,
    dietType: 'vegan',
    isPremium: true,
    category: 'general',
    slug: 'anti-inflammatory-lunch',
  },
  {
    title: 'Energy-Boosting Snack',
    description: 'Natural sugars and protein',
    points: 10,
    dietType: 'vegan',
    isPremium: false,
    category: 'business',
    slug: 'energy-boosting-snack',
  },
  {
    title: 'Magnesium-Rich Dinner',
    description: 'Leafy greens and whole grains',
    points: 15,
    dietType: 'vegetarian',
    isPremium: false,
    category: 'mindset',
    slug: 'magnesium-rich-dinner',
  },
  {
    title: 'Hydration Tracker',
    description: 'Track your water intake',
    points: 10,
    dietType: 'all',
    isPremium: false,
    category: 'general',
    slug: 'hydration-tracker',
  },
  {
    title: 'Brain Food Lunch',
    description: 'Omega-3 rich foods for focus',
    points: 15,
    dietType: 'pescetarian',
    isPremium: false,
    category: 'mindset',
    slug: 'brain-food-lunch',
  },
  {
    title: 'Meal Prep Guide',
    description: 'Save time with prepared meals',
    points: 20,
    dietType: 'pescetarian',
    isPremium: true,
    category: 'business',
    slug: 'meal-prep-guide',
  },
];