import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell } from 'lucide-react-native';
import { useContext } from 'react';
import { FitnessFilterContext } from '@/app/_layout';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';

const workouts = [
  {
    slug: 'morning-energizer',
    title: 'Morning Energizer',
    duration: '15 min',
    points: 10,
    workoutType: 'weights',
    isPremium: false,
    category: 'general',
  },
  {
    slug: 'full-body-strength',
    title: 'Full Body Strength',
    duration: '30 min',
    points: 20,
    workoutType: 'weights',
    isPremium: true,
    category: 'general',
  },
  {
    slug: 'cardio-blast',
    title: 'Cardio Blast',
    duration: '25 min',
    points: 15,
    workoutType: 'phase_based',
    isPremium: false,
    category: 'general',
  },
  {
    slug: 'yoga-flow',
    title: 'Yoga Flow',
    duration: '20 min',
    points: 15,
    workoutType: 'yoga',
    isPremium: false,
    category: 'mindset',
  },
  {
    slug: 'core-workout',
    title: 'Core Workout',
    duration: '10 min',
    points: 10,
    workoutType: 'pilates',
    isPremium: false,
    category: 'business',
  },
  {
    slug: 'meditation-and-movement',
    title: 'Meditation & Movement',
    duration: '15 min',
    points: 15,
    workoutType: 'yoga',
    isPremium: false,
    category: 'mindset',
  },
  {
    slug: 'quick-office-break',
    title: 'Quick Office Break',
    duration: '5 min',
    points: 5,
    workoutType: 'pilates',
    isPremium: false,
    category: 'business',
  },
  {
    slug: 'advanced-hiit',
    title: 'Advanced HIIT',
    duration: '35 min',
    points: 25,
    workoutType: 'phase_based',
    isPremium: true,
    category: 'general',
  },
];

export default function FitnessScreen() {
  const { theme } = useTheme();
  const { activeFilter } = useContext(FitnessFilterContext);
  const styles = createCategoryScreenStyles(theme);

  const filteredWorkouts = workouts.filter((workout) => {
    if (activeFilter === 'by_phase')
      return workout.workoutType === 'phase_based';
    if (activeFilter === 'yoga') return workout.workoutType === 'yoga';
    if (activeFilter === 'pilates') return workout.workoutType === 'pilates';
    if (activeFilter === 'weights') return workout.workoutType === 'weights';
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Fitness</Text>
          <Text style={styles.subtitle}>
            {activeFilter === 'by_phase'
              ? 'Workouts by cycle phase'
              : activeFilter === 'yoga'
              ? 'Yoga workouts'
              : activeFilter === 'pilates'
              ? 'Pilates workouts'
              : activeFilter === 'weights'
              ? 'Strength training'
              : 'All workouts'}
          </Text>
        </View>

        <View style={styles.cardList}>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout, index) => (
              <Link key={index} href={`/fitness/${workout.slug}`} asChild>
                <TouchableOpacity style={styles.card}>
                  <View style={styles.iconContainer}>
                    <Dumbbell size={24} color={theme.colors.primary} />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{workout.title}</Text>
                    <Text style={styles.cardDescription}>
                      {workout.duration}
                    </Text>
                    {workout.isPremium && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>PREMIUM</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>
                      {workout.points} points
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No workouts available for this filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}