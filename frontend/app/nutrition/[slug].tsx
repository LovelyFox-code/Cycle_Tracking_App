import { useLocalSearchParams, Stack } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { recipes } from '@/data/recipes';
import BackButton from '@/components/common/back-button';

export default function RecipeDetailScreen() {
  const { theme } = useTheme();
  const { slug } = useLocalSearchParams();
  const recipeId = Array.isArray(slug) ? slug[0] : slug;
  const slugString = typeof recipeId === 'string' ? recipeId : '';

  // Get recipe data based on slug
  const recipe = recipes.find((item) => item.slug === slugString);

  // If recipe not found
  if (!recipe) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.colors.background.main },
        ]}
      >
        <View style={styles.errorContainer}>
          <Text
            style={[styles.errorText, { color: theme.colors.text.secondary }]}
          >
            Recipe not found
          </Text>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.main },
      ]}
    >
      <Stack.Screen
        options={{
          title: recipe.title,
          headerShown: false,
        }}
      />

      {/* Return Button */}
      <View style={styles.returnButtonContainer}>
        <BackButton />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <Image
          source={{ uri: recipe.heroImage }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Recipe Title */}
        <View
          style={[
            styles.titleContainer,
            { borderBottomColor: theme.colors.background.highlight },
          ]}
        >
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {recipe.title}
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.text.muted }]}
          >
            {recipe.description}
          </Text>

          {/* Optional Info */}
          <View style={styles.infoContainer}>
            {recipe.calories && (
              <View style={styles.infoItem}>
                <Text
                  style={[styles.infoLabel, { color: theme.colors.text.muted }]}
                >
                  Calories
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  {recipe.calories}
                </Text>
              </View>
            )}
            {recipe.prepTime && (
              <View style={styles.infoItem}>
                <Text
                  style={[styles.infoLabel, { color: theme.colors.text.muted }]}
                >
                  Prep Time
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  {recipe.prepTime}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Ingredients */}
        <View
          style={[
            styles.section,
            { borderBottomColor: theme.colors.background.highlight },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Ingredients
          </Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.listItem}>
              <View
                style={[
                  styles.bullet,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
              <Text
                style={[
                  styles.listItemText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                {ingredient}
              </Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View
          style={[
            styles.section,
            { borderBottomColor: theme.colors.background.highlight },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.primary }]}
          >
            Instructions
          </Text>
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.listItem}>
              <Text
                style={[
                  styles.stepNumber,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                {index + 1}
              </Text>
              <Text
                style={[
                  styles.listItemText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                {instruction}
              </Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
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
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    marginTop: 8,
    marginRight: 10,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
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
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
