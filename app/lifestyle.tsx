import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles } from 'lucide-react-native';

export default function LifestyleScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Lifestyle</Text>
          <Text style={styles.subtitle}>Tips and activities for a balanced life</Text>
        </View>
        
        <View style={styles.cardList}>
          {activities.map((activity, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <View style={styles.iconContainer}>
                <Sparkles size={24} color="#FF6B6B" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{activity.title}</Text>
                <Text style={styles.cardDescription}>{activity.description}</Text>
              </View>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{activity.points} points</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const activities = [
  { 
    title: 'Morning Affirmations', 
    description: 'Spend 10 minutes on positive self-talk', 
    points: 10 
  },
  { 
    title: 'Digital Detox', 
    description: 'Take a 2-hour break from screens', 
    points: 15 
  },
  { 
    title: 'Journaling', 
    description: 'Write about your day and feelings', 
    points: 10 
  },
  { 
    title: 'Nature Walk', 
    description: 'Spend 30 minutes outdoors', 
    points: 20 
  },
  { 
    title: 'Mindful Reading', 
    description: 'Read a book for 15 minutes', 
    points: 10 
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
  cardList: {
    marginBottom: 20,
  },
  card: {
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardDescription: {
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
}); 