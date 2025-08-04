import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { useContext } from 'react';
import { RecoveryFilterContext } from '@/app/_layout';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';

export default function RecoveryScreen() {
  const { theme } = useTheme();
  const { activeFilter } = useContext(RecoveryFilterContext);
  const styles = createCategoryScreenStyles(theme);

  // Filter recovery items based on the active filter
  const filteredItems = recoveryItems.filter((item) => {
    if (activeFilter === 'sleep') {
      return item.recoveryType === 'sleep';
    } else if (activeFilter === 'stretching') {
      return item.recoveryType === 'stretching';
    } else if (activeFilter === 'meditation') {
      return item.recoveryType === 'meditation';
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Recovery</Text>
          <Text style={styles.subtitle}>
            {activeFilter === 'sleep'
              ? 'Sleep recovery techniques'
              : activeFilter === 'stretching'
              ? 'Stretching routines'
              : activeFilter === 'meditation'
              ? 'Meditation practices'
              : 'All recovery options'}
          </Text>
        </View>

        <View style={styles.cardList}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Link key={index} href={`/recovery/${item.slug}`} asChild>
                <TouchableOpacity key={index} style={styles.card}>
                  <View style={styles.iconContainer}>
                    <Heart size={24} color={theme.colors.primary} />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>
                      {item.description}
                    </Text>
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
              </Link>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No recovery items available for this filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const recoveryItems = [
  {
    title: 'Deep Breathing',
    description: '5 minutes of focused breathing',
    points: 10,
    recoveryType: 'meditation',
    isPremium: false,
    category: 'mindset',
    slug: 'deep-breathing',
  },
  {
    title: 'Stretching',
    description: '10-minute gentle stretch routine',
    points: 15,
    recoveryType: 'stretching',
    isPremium: false,
    category: 'general',
    slug: 'stretching',
  },
  {
    title: 'Meditation',
    description: 'Guided meditation session',
    points: 20,
    recoveryType: 'meditation',
    isPremium: true,
    category: 'mindset',
    slug: 'meditation',
  },
  {
    title: 'Epsom Salt Bath',
    description: '20-minute relaxation soak',
    points: 15,
    recoveryType: 'stretching',
    isPremium: false,
    category: 'general',
    slug: 'epsom-salt-bath',
  },
  {
    title: 'Sleep Hygiene',
    description: 'Prepare for quality sleep',
    points: 10,
    recoveryType: 'sleep',
    isPremium: false,
    category: 'general',
    slug: 'sleep-hygiene',
  },
  {
    title: 'Quick Desk Stretch',
    description: '2-minute office recovery',
    points: 5,
    recoveryType: 'stretching',
    isPremium: false,
    category: 'business',
    slug: 'quick-desk-stretch',
  },
  {
    title: 'Stress Management',
    description: 'Advanced relaxation techniques',
    points: 25,
    recoveryType: 'sleep',
    isPremium: true,
    category: 'business',
    slug: 'stress-management',
  },
];