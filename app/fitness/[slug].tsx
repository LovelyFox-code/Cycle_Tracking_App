import { useLocalSearchParams, Stack, router } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy workout data
const workouts = [
  {
    slug: 'morning-energizer',
    title: 'Morning Energizer',
    description: 'Quick strength warm-up to kickstart your day',
    duration: '15 min',
    points: 10,
    isPremium: false,
    calories: 120,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    slug: 'yoga-flow',
    title: 'Yoga Flow',
    description: 'Relaxing and grounding flow to release tension',
    duration: '20 min',
    points: 15,
    isPremium: false,
    calories: 100,
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    slug: 'hiit-blast',
    title: 'HIIT Blast',
    description: 'High intensity interval training to boost energy',
    duration: '25 min',
    points: 20,
    isPremium: true,
    calories: 220,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

export default function WorkoutDetailScreen() {
  const { slug } = useLocalSearchParams();
  const workout = workouts.find((w) => w.slug === slug);

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Workout not found.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: workout.title, headerShown: false }} />
      <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.description}>{workout.description}</Text>

        {/* Video Placeholder */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>[ Video Placeholder ]</Text>
          {/* <Video
            source={{ uri: workout.videoUrl }}
            useNativeControls
            resizeMode="cover"
            style={{ height: 200, borderRadius: 12, marginBottom: 20 }}
          /> */}
        </View>

        {/* Details */}
        <View style={styles.details}>
          <Text style={styles.detailText}>Duration: {workout.duration}</Text>
          <Text style={styles.detailText}>Points: {workout.points}</Text>
          {workout.calories && (
            <Text style={styles.detailText}>Calories: {workout.calories}</Text>
          )}
          {workout.isPremium && (
            <Text style={styles.premiumBadge}>Premium Workout</Text>
          )}
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
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 40,
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
    marginBottom: 20,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  videoText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  details: {
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#4B5563',
  },
  premiumBadge: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 80,
    color: '#9CA3AF',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
