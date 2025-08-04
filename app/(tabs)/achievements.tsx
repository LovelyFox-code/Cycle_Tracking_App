import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Star, Target, TrendingUp, Award, Flame } from 'lucide-react-native';
import { getUserData } from '@/utils/storage';
import { useTheme } from '@/hooks/useTheme';

type UserData = {
  totalPoints?: number;
  [key: string]: any;
};

export default function AchievementsScreen() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
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
      icon: <Target size={theme.spacing.l} color={theme.colors.background.card} />,
      unlocked: (userData?.totalPoints || 0) >= 5,
      gradient: theme.colors.gradient.energy,
    },
    {
      id: '2',
      title: 'Nutrition Warrior',
      description: 'Log 5 meals',
      icon: <Star size={theme.spacing.l} color={theme.colors.background.card} />,
      unlocked: (userData?.totalPoints || 0) >= 15,
      gradient: theme.colors.gradient.calm,
    },
    {
      id: '3',
      title: 'Consistent Tracker',
      description: 'Complete tasks for 7 days',
      icon: <Flame size={theme.spacing.l} color={theme.colors.background.card} />,
      unlocked: (userData?.totalPoints || 0) >= 70,
      gradient: theme.colors.gradient.vitality,
    },
    {
      id: '4',
      title: 'Cycle Expert',
      description: 'Track one complete cycle',
      icon: <Trophy size={theme.spacing.l} color={theme.colors.background.card} />,
      unlocked: (userData?.totalPoints || 0) >= 100,
      gradient: theme.colors.gradient.strength,
    },
    {
      id: '5',
      title: 'Wellness Champion',
      description: 'Reach Level 5',
      icon: <Award size={theme.spacing.l} color={theme.colors.background.card} />,
      unlocked: level >= 5,
      gradient: theme.colors.gradient.calm,
    },
    {
      id: '6',
      title: 'Point Master',
      description: 'Earn 500 total points',
      icon: <TrendingUp size={theme.spacing.l} color={theme.colors.background.card} />,
      unlocked: (userData?.totalPoints || 0) >= 500,
      gradient: theme.colors.gradient.passion,
    },
  ];

  const stats = [
    {
      label: 'Total Points',
      value: userData?.totalPoints || 0,
      icon: <Star size={theme.spacing.m} color={theme.colors.primary} />,
    },
    {
      label: 'Current Level',
      value: level,
      icon: <Trophy size={theme.spacing.m} color={theme.colors.primary} />,
    },
    {
      label: 'Achievements',
      value: achievements.filter(a => a.unlocked).length,
      icon: <Award size={theme.spacing.m} color={theme.colors.primary} />,
    },
    {
      label: 'Progress to Next',
      value: `${progress}/100`,
      icon: <Target size={theme.spacing.m} color={theme.colors.primary} />,
    },
  ];

  if (!userData) {
    return (
      <SafeAreaView 
        style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
        edges={['left', 'right']}
      >
        <View style={styles.centerContent}>
          <Text style={[styles.loadingText, { color: theme.colors.text.muted }]}>
            Loading your progress...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
      edges={['left', 'right']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Your Progress</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.muted }]}>
            Celebrate your wellness journey
          </Text>
        </View>

        {/* Level Progress Card */}
        <LinearGradient
          colors={theme.colors.gradient.energy}
          style={[styles.levelCard, { ...theme.shadows.medium }]}
        >
          <View style={styles.levelHeader}>
            <View style={styles.levelIcon}>
              <Trophy size={theme.spacing.xl} color={theme.colors.background.card} />
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
            <View 
              key={index} 
              style={[
                styles.statCard, 
                { 
                  backgroundColor: theme.colors.background.card,
                  ...theme.shadows.small
                }
              ]}
            >
              <View style={styles.statIcon}>
                {stat.icon}
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.text.muted }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Achievements
          </Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <LinearGradient
                key={achievement.id}
                colors={achievement.unlocked ? achievement.gradient : [theme.colors.text.light, theme.colors.text.muted]}
                style={[
                  styles.achievementCard, 
                  !achievement.unlocked && styles.lockedCard,
                  { ...theme.shadows.medium }
                ]}
              >
                <View style={styles.achievementIcon}>
                  {achievement.unlocked ? achievement.icon : 
                    <Target size={theme.spacing.l} color={theme.colors.text.light} />
                  }
                </View>
                <Text style={[
                  styles.achievementTitle, 
                  !achievement.unlocked && [styles.lockedText, { color: theme.colors.text.light }]
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription, 
                  !achievement.unlocked && [styles.lockedText, { color: theme.colors.text.light }]
                ]}>
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
        <View style={[
          styles.motivationCard, 
          { 
            backgroundColor: theme.colors.background.card,
            ...theme.shadows.small
          }
        ]}>
          <Text style={[styles.motivationTitle, { color: theme.colors.text.primary }]}>
            🌟 Keep Going!
          </Text>
          <Text style={[styles.motivationText, { color: theme.colors.text.muted }]}>
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
  },
  tabSpacing: {
    height: 64, // Add extra space at the top to account for tabs
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  header: {
    padding: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  levelCard: {
    margin: 24,
    marginTop: 8,
    padding: 24,
    borderRadius: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    margin: '1%',
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
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
    lineHeight: 18,
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
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  motivationCard: {
    margin: 24,
    padding: 24,
    borderRadius: 16,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    lineHeight: 24,
  },
});