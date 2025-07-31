import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

type RecoveryKey = 'deep-breathing' | 'meditation';

type RecoveryItem = {
  title: string;
  description: string;
  videoUrl: string;
  points: number;
  isPremium: boolean;
};

const dummyRecoveryData: Record<RecoveryKey, RecoveryItem> = {
  'deep-breathing': {
    title: 'Deep Breathing',
    description: '5 minutes of focused breathing',
    videoUrl: 'https://example.com/deep-breathing.mp4',
    points: 10,
    isPremium: false,
  },
  meditation: {
    title: 'Meditation',
    description: '10 minutes of guided meditation',
    videoUrl: 'https://example.com/meditation.mp4',
    points: 20,
    isPremium: true,
  },
  // Add more...
};

export default function RecoveryDetail() {
  const { slug } = useLocalSearchParams();

  const recovery = dummyRecoveryData[slug as RecoveryKey];

  if (!recovery) {
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
      <Stack.Screen options={{ title: recovery.title, headerShown: false }} />
      <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{recovery.title}</Text>
        <Text style={styles.description}>{recovery.description}</Text>

        <View style={styles.videoPlaceholder}>
          <Text style={{ color: '#9CA3AF' }}>[Video would appear here]</Text>
        </View>

        <Text style={styles.points}>Points: {recovery.points}</Text>
        {recovery.isPremium && <Text style={styles.premiumBadge}>PREMIUM</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#6B7280', marginBottom: 20 },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
  points: { fontSize: 16, fontWeight: '600' },
  premiumBadge: {
    marginTop: 10,
    color: '#92400E',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonContainer: {
    top: 10,
    left: 0,
    position: 'absolute',
    paddingBottom: 0,
  },
  returnButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
});
