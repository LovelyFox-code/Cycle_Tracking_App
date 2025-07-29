import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell } from 'lucide-react-native';
import { useContext } from 'react';
import { FilterContext } from '@/app/_layout';

export default function FitnessScreen() {
  const { activeFilter } = useContext(FilterContext);
  
  // Filter workouts based on the active filter
  const filteredWorkouts = workouts.filter(workout => {
    if (activeFilter === 'Today') {
      return workout.recommended === 'today';
    } else if (activeFilter === 'Premium') {
      return workout.isPremium;
    } else if (activeFilter === 'Mindset') {
      return workout.category === 'mindset';
    } else if (activeFilter === 'Business') {
      return workout.category === 'business';
    }
    return true; // Show all for 'More' or any other filter
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Fitness</Text>
          <Text style={styles.subtitle}>
            {activeFilter === 'Today' ? 'Today\'s recommended workouts' :
             activeFilter === 'Premium' ? 'Premium workouts' :
             activeFilter === 'Mindset' ? 'Mindset-focused exercises' :
             activeFilter === 'Business' ? 'Quick workouts for busy people' :
             'All workouts'}
          </Text>
        </View>
        
        <View style={styles.workoutList}>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout, index) => (
              <TouchableOpacity key={index} style={styles.workoutCard}>
                <View style={styles.workoutIconContainer}>
                  <Dumbbell size={24} color="#FF6B6B" />
                </View>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <Text style={styles.workoutDuration}>{workout.duration}</Text>
                  {workout.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>PREMIUM</Text>
                    </View>
                  )}
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={styles.pointsText}>{workout.points} points</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No workouts available for this filter</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const workouts = [
  { 
    title: 'Morning Energizer', 
    duration: '15 min', 
    points: 10,
    recommended: 'today',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Full Body Strength', 
    duration: '30 min', 
    points: 20,
    recommended: '',
    isPremium: true,
    category: 'general'
  },
  { 
    title: 'Cardio Blast', 
    duration: '25 min', 
    points: 15,
    recommended: 'today',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Yoga Flow', 
    duration: '20 min', 
    points: 15,
    recommended: '',
    isPremium: false,
    category: 'mindset'
  },
  { 
    title: 'Core Workout', 
    duration: '10 min', 
    points: 10,
    recommended: '',
    isPremium: false,
    category: 'business'
  },
  { 
    title: 'Meditation & Movement', 
    duration: '15 min', 
    points: 15,
    recommended: '',
    isPremium: false,
    category: 'mindset'
  },
  { 
    title: 'Quick Office Break', 
    duration: '5 min', 
    points: 5,
    recommended: '',
    isPremium: false,
    category: 'business'
  },
  { 
    title: 'Advanced HIIT', 
    duration: '35 min', 
    points: 25,
    recommended: '',
    isPremium: true,
    category: 'general'
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
  workoutList: {
    marginBottom: 20,
  },
  workoutCard: {
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
  workoutIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  workoutDuration: {
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