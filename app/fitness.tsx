import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell } from 'lucide-react-native';
import { useContext } from 'react';
import { FitnessFilterContext } from '@/app/_layout';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryScreenStyles } from '@/styles/screens/categoryScreens';
import { workouts } from '@/data/workouts';

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
