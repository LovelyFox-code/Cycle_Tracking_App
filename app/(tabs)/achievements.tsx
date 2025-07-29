import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Star, Target, TrendingUp, Award, Flame } from 'lucide-react-native';
import { getUserData } from '@/utils/storage';

export default function AchievementsScreen() {
  const [userData, setUserData] = useState(null);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
      const userLevel = Math.floor((data.totalPoints || 0) / 100) + 1;
      const progressInLevel = ((data.totalPoints || 0) % 100);
      setLevel(userLevel);
      setProgress(progressInLevel);
    }
  };

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first workout',
      icon: <Target size={24} color="#FFFFFF" />,
      unlocked: (userData?.totalPoints || 0) >= 5,
      gradient: ['#FF6B6B', '#FF8E53'],
    },
    {
      id: '2',
      title: 'Nutrition Warrior',
      description: 'Log 5 meals',
      icon: <Star size={24} color="#FFFFFF" />,
      unlocked: (userData?.totalPoints || 0) >= 15,
      gradient: ['#4ECDC4', '#44A08D'],
    },
    {
      id: '3',
      title: 'Consistent Tracker',
      description: 'Complete tasks for 7 days',
      icon: <Flame size={24} color="#FFFFFF" />,
      unlocked: (userData?.totalPoints || 0) >= 70,
      gradient: ['#FFD93D', '#FF6B6B'],
    },
    {
      id: '4',
      title: 'Cycle Expert',
      description: 'Track one complete cycle',
      icon: <Trophy size={24} color="#FFFFFF" />,
      unlocked: (userData?.totalPoints || 0) >= 100,
      gradient: ['#8E24AA', '#FF1744'],
    },
    {
      id: '5',
      title: 'Wellness Champion',
      description: 'Reach Level 5',
      icon: <Award size={24} color="#FFFFFF" />,
      unlocked: level >= 5,
      gradient: ['#667eea', '#764ba2'],
    },
    {
      id: '6',
      title: 'Point Master',
      description: 'Earn 500 total points',
      icon: <TrendingUp size={24} color="#FFFFFF" />,
      unlocked: (userData?.totalPoints || 0) >= 500,
      gradient: ['#f093fb', '#f5576c'],
    },
  ];

  const stats = [
    {
      label: 'Total Points',
      value: userData?.totalPoints || 0,
      icon: <Star size={20} color="#FF6B6B" />,
    },
    {
      label: 'Current Level',
      value: level,
      icon: <Trophy size={20} color="#FF6B6B" />,
    },
    {
      label: 'Achievements',
      value: achievements.filter(a => a.unlocked).length,
      icon: <Award size={20} color="#FF6B6B" />,
    },
    {
      label: 'Progress to Next',
      value: `${progress}/100`,
      icon: <Target size={20} color="#FF6B6B" />,
    },
  ];

  if (!userData) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading your progress...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Celebrate your wellness journey</Text>
        </View>

        {/* Level Progress Card */}
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          style={styles.levelCard}
        >
          <View style={styles.levelHeader}>
            <View style={styles.levelIcon}>
              <Trophy size={32} color="#FFFFFF" />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>Level {level}</Text>
              <Text style={styles.levelSubtext}>Keep up the great work!</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Progress to Level {level + 1}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}/100 points</Text>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                {stat.icon}
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <LinearGradient
                key={achievement.id}
                colors={achievement.unlocked ? achievement.gradient : ['#E5E7EB', '#D1D5DB']}
                style={[styles.achievementCard, !achievement.unlocked && styles.lockedCard]}
              >
                <View style={styles.achievementIcon}>
                  {achievement.unlocked ? achievement.icon : 
                    <Target size={24} color="#9CA3AF" />
                  }
                </View>
                <Text style={[styles.achievementTitle, !achievement.unlocked && styles.lockedText]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, !achievement.unlocked && styles.lockedText]}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>Unlocked!</Text>
                  </View>
                )}
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Motivational Section */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>🌟 Keep Going!</Text>
          <Text style={styles.motivationText}>
            Every task you complete brings you closer to your wellness goals. 
            Small consistent actions create lasting change.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  tabSpacing: {
    height: 60, // Add extra space at the top to account for tabs
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  levelCard: {
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  levelSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    margin: '1%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  lockedCard: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  achievementDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  unlockedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  unlockedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  motivationCard: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
});