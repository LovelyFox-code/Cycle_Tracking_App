import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { useContext } from 'react';
import { RecoveryFilterContext } from '@/app/_layout';

export default function RecoveryScreen() {
  const { activeFilter } = useContext(RecoveryFilterContext);
  
  // Filter recovery items based on the active filter
  const filteredItems = recoveryItems.filter(item => {
    if (activeFilter === 'sleep') {
      return item.recoveryType === 'sleep';
    } else if (activeFilter === 'stretching') {
      return item.recoveryType === 'stretching';
    } else if (activeFilter === 'meditation') {
      return item.recoveryType === 'meditation';
    }
    return true; // Show all when 'all' is selected
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Recovery</Text>
          <Text style={styles.subtitle}>
            {activeFilter === 'sleep' ? 'Sleep recovery techniques' :
             activeFilter === 'stretching' ? 'Stretching routines' :
             activeFilter === 'meditation' ? 'Meditation practices' :
             'All recovery options'}
          </Text>
        </View>
        
        <View style={styles.cardList}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <View style={styles.iconContainer}>
                  <Heart size={24} color="#FF6B6B" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
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
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No recovery items available for this filter</Text>
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
    category: 'mindset'
  },
  { 
    title: 'Stretching', 
    description: '10-minute gentle stretch routine', 
    points: 15,
    recoveryType: 'stretching',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Meditation', 
    description: 'Guided meditation session', 
    points: 20,
    recoveryType: 'meditation',
    isPremium: true,
    category: 'mindset'
  },
  { 
    title: 'Epsom Salt Bath', 
    description: '20-minute relaxation soak', 
    points: 15,
    recoveryType: 'stretching',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Sleep Hygiene', 
    description: 'Prepare for quality sleep', 
    points: 10,
    recoveryType: 'sleep',
    isPremium: false,
    category: 'general'
  },
  { 
    title: 'Quick Desk Stretch', 
    description: '2-minute office recovery', 
    points: 5,
    recoveryType: 'stretching',
    isPremium: false,
    category: 'business'
  },
  { 
    title: 'Stress Management', 
    description: 'Advanced relaxation techniques', 
    points: 25,
    recoveryType: 'sleep',
    isPremium: true,
    category: 'business'
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