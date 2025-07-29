import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Calendar, Target, Settings, CreditCard as Edit3, Save, X } from 'lucide-react-native';
import { getUserData, saveUserData, clearUserData } from '@/utils/storage';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
      setEditedData(data);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await saveUserData(editedData);
      setUserData(editedData);
      setEditModalVisible(false);
      Alert.alert('Success', 'Your profile has been updated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    }
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'This will permanently delete all your data including cycle history, points, and achievements. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await clearUserData();
            Alert.alert('Data Reset', 'All your data has been cleared. You can start fresh!', [
              { text: 'OK', onPress: () => router.replace('/onboarding') }
            ]);
          },
        },
      ]
    );
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading your profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const profileStats = [
    {
      label: 'Member Since',
      value: new Date(userData.createdAt).toLocaleDateString(),
      icon: <Calendar size={20} color="#FF6B6B" />,
    },
    {
      label: 'Current Goal',
      value: userData.goals?.join(', ') || 'Not set',
      icon: <Target size={20} color="#FF6B6B" />,
    },
    {
      label: 'Cycle Length',
      value: `${userData.cycleLength} days`,
      icon: <User size={20} color="#FF6B6B" />,
    },
    {
      label: 'Total Points',
      value: userData.totalPoints || 0,
      icon: <Settings size={20} color="#FF6B6B" />,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.subtitle}>Manage your wellness journey</Text>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          style={styles.profileCard}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <User size={32} color="#FFFFFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Welcome back!</Text>
              <Text style={styles.profileSubtext}>
                Level {Math.floor((userData.totalPoints || 0) / 100) + 1} • {userData.totalPoints || 0} points
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditModalVisible(true)}
            >
              <Edit3 size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Profile Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <View style={styles.statIcon}>
                {stat.icon}
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => setEditModalVisible(true)}>
            <View style={styles.settingContent}>
              <Edit3 size={20} color="#6B7280" />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleResetData}>
            <View style={styles.settingContent}>
              <X size={20} color="#EF4444" />
              <Text style={[styles.settingText, { color: '#EF4444' }]}>Reset All Data</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About CycleSync</Text>
          <Text style={styles.infoText}>
            CycleSync helps you align your wellness routine with your natural cycle phases. 
            Track your progress, earn points, and discover what works best for your body.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSaveChanges}>
              <Save size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Cycle Length (days)</Text>
              <TextInput
                style={styles.textInput}
                value={editedData.cycleLength?.toString()}
                onChangeText={(text) => setEditedData({...editedData, cycleLength: parseInt(text) || 28})}
                keyboardType="numeric"
                placeholder="28"
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Last Period Date</Text>
              <Text style={styles.dateDisplay}>
                {new Date(editedData.lastPeriodDate).toLocaleDateString()}
              </Text>
              <Text style={styles.dateNote}>
                To change this, please track your next period start date
              </Text>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Health Goals</Text>
              {['Balance', 'Strength', 'Fat Loss', 'Mental Clarity', 'Energy'].map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={styles.goalOption}
                  onPress={() => {
                    const currentGoals = editedData.goals || [];
                    const updatedGoals = currentGoals.includes(goal)
                      ? currentGoals.filter(g => g !== goal)
                      : [...currentGoals, goal];
                    setEditedData({...editedData, goals: updatedGoals});
                  }}
                >
                  <View style={[
                    styles.goalCheckbox,
                    editedData.goals?.includes(goal) && styles.goalChecked
                  ]}>
                    {editedData.goals?.includes(goal) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.goalText}>{goal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  editButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  statsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
  },
  infoCard: {
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
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateDisplay: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  dateNote: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  goalCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalChecked: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  goalText: {
    fontSize: 16,
    color: '#1F2937',
  },
});