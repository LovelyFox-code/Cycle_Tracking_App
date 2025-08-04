import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, HelpCircle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { clearUserData } from '@/utils/storage';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/common';

export default function ProfileScreen() {
  const { theme } = useTheme();
  
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
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background.main }]} 
      edges={['left', 'right']}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>Your Profile</Text>
        </View>
        
        {/* User Profile Card */}
        <View style={[styles.profileCard, { 
          backgroundColor: theme.colors.background.card,
          ...theme.shadows.small
        }]}>
          <Image source={userData.profileImage} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: theme.colors.text.primary }]}>{userData.name}</Text>
            <Text style={[styles.userEmail, { color: theme.colors.text.muted }]}>{userData.email}</Text>
            <Text style={[styles.memberSince, { color: theme.colors.text.light }]}>{userData.joinDate}</Text>
          </View>
        </View>
        
        {/* Theme Settings */}
        <View style={[styles.themeSection, { 
          backgroundColor: theme.colors.background.card,
          ...theme.shadows.small
        }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Appearance</Text>
          <ThemeToggle showBrandOptions={true} />
        </View>
        
        {/* Subscription Banner */}
        <TouchableOpacity style={[styles.subscriptionBanner, { backgroundColor: theme.colors.background.highlight }]}>
          <View style={styles.subscriptionContent}>
            <Text style={[styles.subscriptionTitle, { color: theme.colors.text.primary }]}>Upgrade to Premium</Text>
            <Text style={[styles.subscriptionDescription, { color: theme.colors.text.secondary }]}>
              Get unlimited access to all features
            </Text>
          </View>
          <View style={[styles.subscriptionButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.subscriptionButtonText}>Upgrade</Text>
          </View>
        </TouchableOpacity>
        
        {/* Menu Items */}
        <View style={[styles.menuContainer, { 
          backgroundColor: theme.colors.background.card,
          ...theme.shadows.small
        }]}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.menuItem, 
                  { borderBottomColor: theme.colors.background.highlight },
                  index === menuItems.length - 1 ? styles.menuItemLast : null
                ]}
                onPress={item.onPress}
              >
                <Icon size={22} color={theme.colors.text.secondary} style={styles.menuIcon} />
                <Text style={[styles.menuLabel, { color: theme.colors.text.secondary }]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* App Version */}
        <Text style={[styles.versionText, { color: theme.colors.text.light }]}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
  },
  themeSection: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  subscriptionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 4,
  },
  subscriptionDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  subscriptionButton: {
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
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 24,
  },
});