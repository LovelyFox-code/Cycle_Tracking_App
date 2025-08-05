import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utensils } from 'lucide-react-native';
import { useContext } from 'react';
import { NutritionFilterContext } from '@/app/_layout';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';
import { recipes } from '@/data/recipes';

export default function NutritionScreen() {
  const { theme } = useTheme();
  const { activeFilter } = useContext(NutritionFilterContext);
  const styles = createCategoryScreenStyles(theme);

  // Filter nutrition items based on the active filter
  const filteredItems = recipes.filter((item) => {
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
