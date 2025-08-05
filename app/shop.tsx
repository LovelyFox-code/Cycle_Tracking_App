import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShoppingBag,
  Pill,
  Shirt,
  Dumbbell,
  Sparkles,
} from 'lucide-react-native';
import { router } from 'expo-router';
import BackButton from '@/components/common/BackButton';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';
import { shopCategories } from '@/data/shop';

export default function ShopScreen() {
  const { theme } = useTheme();
  const styles = createCategoryScreenStyles(theme);
  const [activeCategory, setActiveCategory] = useState('all');

  // Helper function to get the icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'pill':
        return <Pill size={24} color={theme.colors.primary} />;
      case 'shirt':
        return <Shirt size={24} color={theme.colors.primary} />;
      case 'dumbbell':
        return <Dumbbell size={24} color={theme.colors.primary} />;
      case 'sparkles':
        return <Sparkles size={24} color={theme.colors.primary} />;
      default:
        return <ShoppingBag size={24} color={theme.colors.primary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={shopStyles.headerWithBack}>
          <View style={styles.header}>
            <Text style={styles.title}>Shop</Text>
            <Text style={styles.subtitle}>
              Browse our collection of health and wellness products
            </Text>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={shopStyles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              shopStyles.categoryButton,
              activeCategory === 'all' && shopStyles.activeCategoryButton,
              { backgroundColor: theme.colors.background.card },
            ]}
            onPress={() => setActiveCategory('all')}
          >
            <ShoppingBag
              size={24}
              color={
                activeCategory === 'all'
                  ? theme.colors.primary
                  : theme.colors.text.muted
              }
            />
            <Text
              style={[
                shopStyles.categoryText,
                { color: theme.colors.text.muted },
                activeCategory === 'all' && {
                  color: theme.colors.text.primary,
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {shopCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                shopStyles.categoryButton,
                activeCategory === category.id &&
                  shopStyles.activeCategoryButton,
                { backgroundColor: theme.colors.background.card },
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              {React.cloneElement(getIconComponent(category.icon), {
                color:
                  activeCategory === category.id
                    ? theme.colors.primary
                    : theme.colors.text.muted,
              })}
              <Text
                style={[
                  shopStyles.categoryText,
                  { color: theme.colors.text.muted },
                  activeCategory === category.id && {
                    color: theme.colors.text.primary,
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.cardList}>
          {shopCategories.map((category, index) => {
            // Only show the selected category or all categories
            if (activeCategory !== 'all' && activeCategory !== category.id) {
              return null;
            }

            return (
              <TouchableOpacity
                key={category.id}
                style={styles.card}
                onPress={() => router.push(`/shop/${category.id}`)}
              >
                <View style={styles.iconContainer}>
                  {getIconComponent(category.icon)}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{category.name}</Text>
                  <Text style={styles.cardDescription}>
                    {category.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const shopStyles = StyleSheet.create({
  headerWithBack: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  activeCategoryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
