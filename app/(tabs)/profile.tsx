import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, HelpCircle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { clearUserData } from '@/utils/storage';

export default function ProfileScreen() {
  // Mock user data - in a real app, this would come from a state management system or API
  const userData = {
    name: "Alina",
    email: "Alina@example.com",
    joinDate: "Member since March 2023",
    profileImage: require('@/assets/images/icon.png')
  };

  const handleLogout = async () => {
    // Clear user data from storage
    await clearUserData();
    // Navigate to onboarding screen
    router.replace('/onboarding');
  };

  const menuItems = [
    { icon: Settings, label: 'Settings', onPress: () => console.log('Settings pressed') },
    { icon: Bell, label: 'Notifications', onPress: () => console.log('Notifications pressed') },
    { icon: HelpCircle, label: 'Help & Support', onPress: () => console.log('Help pressed') },
    { icon: LogOut, label: 'Log Out', onPress: handleLogout },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Profile</Text>
        </View>
        
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <Image source={userData.profileImage} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            <Text style={styles.memberSince}>{userData.joinDate}</Text>
          </View>
        </View>
        
        {/* Subscription Banner */}
        <TouchableOpacity style={styles.subscriptionBanner}>
          <View style={styles.subscriptionContent}>
            <Text style={styles.subscriptionTitle}>Upgrade to Premium</Text>
            <Text style={styles.subscriptionDescription}>Get unlimited access to all features</Text>
          </View>
          <View style={styles.subscriptionButton}>
            <Text style={styles.subscriptionButtonText}>Upgrade</Text>
          </View>
        </TouchableOpacity>
        
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.menuItem, 
                  index === menuItems.length - 1 ? styles.menuItemLast : null
                ]}
                onPress={item.onPress}
              >
                <Icon size={22} color="#4B5563" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingBottom: 60, // Make room for bottom tabs
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  subscriptionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF3C7',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 12,
    padding: 16,
  },
  subscriptionContent: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: '#92400E',
    opacity: 0.8,
  },
  subscriptionButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscriptionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#4B5563',
  },
  versionText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 24,
  },
});