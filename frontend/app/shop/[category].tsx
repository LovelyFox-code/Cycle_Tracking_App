import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShoppingBag,
  Pill,
  Shirt,
  Dumbbell,
  Sparkles,
  PlusCircle,
} from 'lucide-react-native';
import BackButton from '@/components/common/back-button';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';
import { shopItems, shopCategories } from '@/data/shop';
import { useShop } from '@/app/shop-context';

export default function ShopCategoryScreen() {
  const { theme } = useTheme();
  const styles = createCategoryScreenStyles(theme);
  const { category } = useLocalSearchParams<{ category: string }>();
  const { addToCart } = useShop();

  const shopStyles = StyleSheet.create({
    headerWithBack: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    productCard: {
      paddingVertical: 16,
    },
    priceContainer: {
      marginBottom: 8,
      alignItems: 'flex-end',
    },
    priceText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    outOfStockBadge: {
      backgroundColor: `${theme.colors.status.error}10`,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      alignSelf: 'flex-end',
    },
    outOfStockText: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.status.error,
    },
    addToCartButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addToCartText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
      marginLeft: 4,
    },
  });

  // Get the current category info
  const categoryInfo = shopCategories.find((cat) => cat.id === category) || {
    name: 'Products',
    description: 'Browse our products',
    icon: 'shopping-bag',
  };

  // Filter items by category
  const filteredItems = shopItems.filter((item) => {
    if (category === 'all') return true;
    return item.category === category;
  });

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
          <BackButton />
          <View style={styles.header}>
            <Text style={styles.title}>{categoryInfo.name}</Text>
            <Text style={styles.subtitle}>{categoryInfo.description}</Text>
          </View>
        </View>

        <View style={styles.cardList}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, shopStyles.productCard]}
              >
                <View style={styles.iconContainer}>
                  {getIconComponent(
                    shopCategories.find((cat) => cat.id === item.category)
                      ?.icon || 'shopping-bag'
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  {item.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>PREMIUM</Text>
                    </View>
                  )}
                </View>
                <View>
                  <View style={shopStyles.priceContainer}>
                    <Text style={shopStyles.priceText}>
                      ${item.price.toFixed(2)}
                    </Text>
                  </View>
                  {item.points && (
                    <View style={styles.pointsContainer}>
                      <Text style={styles.pointsText}>
                        {item.points} points
                      </Text>
                    </View>
                  )}
                  {!item.inStock ? (
                    <View style={shopStyles.outOfStockBadge}>
                      <Text style={shopStyles.outOfStockText}>
                        Out of Stock
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={shopStyles.addToCartButton}
                      onPress={() => {
                        addToCart(item);
                        Alert.alert(
                          'Added to Cart',
                          `${item.name} has been added to your cart.`
                        );
                      }}
                    >
                      <PlusCircle size={16} color={theme.colors.text.light} />
                      <Text style={shopStyles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No products available in this category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
