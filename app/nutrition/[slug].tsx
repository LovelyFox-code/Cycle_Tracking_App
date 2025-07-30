import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

// Recipe data - in a real app, this would come from an API or database
const recipes = {
  'hormone-balancing-breakfast': {
    title: 'Hormone-Balancing Breakfast',
    description: 'Protein-rich morning meal',
    heroImage: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=2013&auto=format&fit=crop',
    ingredients: [
      '2 eggs',
      '1/2 avocado, sliced',
      '1 cup spinach',
      '1/4 cup pumpkin seeds',
      '1 tablespoon olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Heat olive oil in a pan over medium heat.',
      'Add spinach and cook until wilted, about 1 minute.',
      'Crack eggs into the pan and cook to your preference.',
      'Plate the eggs and spinach, add sliced avocado and pumpkin seeds.',
      'Season with salt and pepper.'
    ],
    calories: 450,
    prepTime: '15 minutes'
  },
  'anti-inflammatory-lunch': {
    title: 'Anti-Inflammatory Lunch',
    description: 'Colorful veggies and healthy fats',
    heroImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      '1 cup quinoa, cooked',
      '1 cup mixed greens',
      '1/2 cup cherry tomatoes, halved',
      '1/4 cup walnuts, chopped',
      '1/4 cup blueberries',
      '1 tablespoon olive oil',
      '1 tablespoon apple cider vinegar',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Combine cooked quinoa, mixed greens, cherry tomatoes, walnuts, and blueberries in a bowl.',
      'In a small bowl, whisk together olive oil and apple cider vinegar.',
      'Pour dressing over salad and toss to combine.',
      'Season with salt and pepper.'
    ],
    calories: 380,
    prepTime: '10 minutes'
  },
  'energy-boosting-snack': {
    title: 'Energy-Boosting Snack',
    description: 'Natural sugars and protein',
    heroImage: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1974&auto=format&fit=crop',
    ingredients: [
      '1 banana',
      '2 tablespoons almond butter',
      '1 tablespoon chia seeds',
      '1 tablespoon honey (optional)',
      'Dash of cinnamon'
    ],
    instructions: [
      'Slice banana lengthwise.',
      'Spread almond butter over banana slices.',
      'Sprinkle with chia seeds and cinnamon.',
      'Drizzle with honey if desired.'
    ],
    calories: 250,
    prepTime: '5 minutes'
  },
  'magnesium-rich-dinner': {
    title: 'Magnesium-Rich Dinner',
    description: 'Leafy greens and whole grains',
    heroImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      '1 cup brown rice, cooked',
      '2 cups kale, chopped',
      '1 cup black beans, cooked',
      '1/2 cup pumpkin seeds',
      '1 avocado, sliced',
      '2 tablespoons olive oil',
      '1 lemon, juiced',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large bowl, combine cooked brown rice, chopped kale, and black beans.',
      'In a small bowl, whisk together olive oil and lemon juice.',
      'Pour dressing over rice mixture and toss to combine.',
      'Top with sliced avocado and pumpkin seeds.',
      'Season with salt and pepper.'
    ],
    calories: 650,
    prepTime: '20 minutes'
  },
  'brain-food-lunch': {
    title: 'Brain Food Lunch',
    description: 'Omega-3 rich foods for focus',
    heroImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop',
    ingredients: [
      '4 oz salmon fillet',
      '1 cup mixed greens',
      '1/2 cup quinoa, cooked',
      '1/4 cup walnuts, chopped',
      '1/2 avocado, sliced',
      '1 tablespoon olive oil',
      '1 lemon, juiced',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Season salmon with salt and pepper, and bake for 12-15 minutes.',
      'In a bowl, combine mixed greens, quinoa, walnuts, and avocado.',
      'In a small bowl, whisk together olive oil and lemon juice.',
      'Pour dressing over salad and toss to combine.',
      'Serve salmon over salad.'
    ],
    calories: 520,
    prepTime: '25 minutes'
  },
  'meal-prep-guide': {
    title: 'Meal Prep Guide',
    description: 'Save time with prepared meals',
    heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
    ingredients: [
      '2 cups quinoa',
      '4 chicken breasts',
      '2 sweet potatoes',
      '1 bunch broccoli',
      '2 bell peppers',
      '1 cup cherry tomatoes',
      '4 tablespoons olive oil',
      'Salt, pepper, and herbs to taste'
    ],
    instructions: [
      'Cook quinoa according to package instructions.',
      'Season chicken breasts with salt, pepper, and herbs, and bake at 375°F (190°C) for 25-30 minutes.',
      'Dice sweet potatoes and roast at 400°F (200°C) for 20-25 minutes.',
      'Cut broccoli into florets and steam for 5 minutes.',
      'Slice bell peppers and cherry tomatoes.',
      'Divide all ingredients into meal prep containers.',
      'Store in refrigerator for up to 4 days.'
    ],
    calories: 'Varies per portion',
    prepTime: '60 minutes (for 4-5 meals)'
  }
};

export default function RecipeDetailScreen() {
  const { slug } = useLocalSearchParams();
  const recipeId = Array.isArray(slug) ? slug[0] : slug;
  
  // Get recipe data based on slug
  const recipe = recipes[recipeId as keyof typeof recipes];
  
  // If recipe not found
  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Recipe not found</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
              <Stack.Screen 
        options={{
          title: recipe.title,
          headerShown: false,
        }} 
      />
        
        {/* Return Button */}
        <View style={styles.returnButtonContainer}>
          <TouchableOpacity 
            style={styles.returnButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
        </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image 
          source={{ uri: recipe.heroImage }} 
          style={styles.heroImage} 
          resizeMode="cover"
        />
        
        {/* Recipe Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.description}>{recipe.description}</Text>
          
          {/* Optional Info */}
          <View style={styles.infoContainer}>
            {recipe.calories && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Calories</Text>
                <Text style={styles.infoValue}>{recipe.calories}</Text>
              </View>
            )}
            {recipe.prepTime && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Prep Time</Text>
                <Text style={styles.infoValue}>{recipe.prepTime}</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listItemText}>{ingredient}</Text>
            </View>
          ))}
        </View>
        
        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.listItemText}>{instruction}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  titleContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  infoItem: {
    marginRight: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
    marginTop: 8,
    marginRight: 10,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
    color: '#4B5563',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  returnButtonContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10,
  },
  returnButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});