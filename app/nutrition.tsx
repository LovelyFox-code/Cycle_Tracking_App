import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utensils } from 'lucide-react-native';
import { useContext } from 'react';
import { FilterContext } from '@/app/_layout';

export default function NutritionScreen() {
  const { activeFilter } = useContext(FilterContext);
  
  // Filter nutrition items based on the active filter
  const filteredItems = nutritionItems.filter(item => {
    if (activeFilter === 'Today') {
      return item.recommended === 'today';
    } else if (activeFilter === 'Premium') {
      return item.isPremium;
    } else if (activeFilter === 'Mindset') {
      return item.category === 'mindset';
    } else if (activeFilter === 'Business') {
      return item.category === 'business';
    }
    return true; // Show all for 'More' or any other filter
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition</Text>
          <Text style={styles.subtitle}>
            {activeFilter === 'Today' ? 'Today\'s recommended meals' :
             activeFilter === 'Premium' ? 'Premium nutrition plans' :
             activeFilter === 'Mindset' ? 'Foods for mental clarity' :
             activeFilter === 'Business' ? 'Quick and easy meals' :
             'All nutrition options'}
          </Text>
        </View>
        
        <View style={styles.cardList}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <View style={styles.iconContainer}>
                  <Utensils size={24} color="#FF6B6B" />
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
              <Text style={styles.emptyStateText}>No nutrition items available for this filter</Text>
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
    recommended: 'today',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Anti-Inflammatory Lunch', 
    description: 'Colorful veggies and healthy fats', 
    points: 15,
    recommended: '',
    isPremium: true,
    category: 'general'
  },
  { 
    title: 'Energy-Boosting Snack', 
    description: 'Natural sugars and protein', 
    points: 10,
    recommended: 'today',
    isPremium: false,
    category: 'business'
  },
  { 
    title: 'Magnesium-Rich Dinner', 
    description: 'Leafy greens and whole grains', 
    points: 15,
    recommended: '',
    isPremium: false,
    category: 'mindset'
  },
  { 
    title: 'Hydration Tracker', 
    description: 'Track your water intake', 
    points: 10,
    recommended: '',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Brain Food Lunch', 
    description: 'Omega-3 rich foods for focus', 
    points: 15,
    recommended: '',
    isPremium: false,
    category: 'mindset'
  },
  { 
    title: 'Meal Prep Guide', 
    description: 'Save time with prepared meals', 
    points: 20,
    recommended: '',
    isPremium: true,
    category: 'business'
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingBottom: 60, // Make room for bottom tabs
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  cardList: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F0',
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
    color: '#1F2937',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  pointsContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  premiumBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
}); 