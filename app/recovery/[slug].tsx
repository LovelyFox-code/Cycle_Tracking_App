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
import { useTheme } from '@/hooks/useTheme';

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
  const { theme } = useTheme();
  const { slug } = useLocalSearchParams();

  const recovery = dummyRecoveryData[slug as RecoveryKey];

  if (!recovery) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text.secondary }]}>
            Recovery practice not found
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
      <Stack.Screen options={{ title: recovery.title, headerShown: false }} />
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={[
          styles.backIcon, 
          { 
            backgroundColor: `${theme.colors.background.card}E6`,
            ...theme.shadows.small
          }
        ]}
      >
        <ArrowLeft size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          {recovery.title}
        </Text>
        <Text style={[styles.description, { color: theme.colors.text.muted }]}>
          {recovery.description}
        </Text>

        <View style={[styles.videoPlaceholder, { backgroundColor: theme.colors.background.highlight }]}>
          <Text style={{ color: theme.colors.text.light }}>[Video would appear here]</Text>
        </View>

        <Text style={[styles.points, { color: theme.colors.text.primary }]}>
          Points: {recovery.points}
        </Text>
        {recovery.isPremium && (
          <Text style={[
            styles.premiumBadge, 
            { 
              color: theme.colors.accent,
              backgroundColor: `${theme.colors.status.warning}30` 
            }
          ]}>
            PREMIUM
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  scrollContent: { 
    paddingTop: 50, 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  description: { 
    fontSize: 16, 
    marginBottom: 20 
  },
  videoPlaceholder: {
    height: 200,
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
    padding: 8,
    borderRadius: 20,
  },
  points: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
  premiumBadge: {
    marginTop: 10,
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
    alignSelf: 'flex-start',
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
});