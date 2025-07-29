import { useEffect, useState, createContext, useContext } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { checkOnboardingStatus } from '@/utils/storage';
import { router } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { Chrome as Home, Calendar, User, Award, Search, ShoppingBag, Trophy, Heart, Utensils, Dumbbell } from 'lucide-react-native';
import { usePathname } from 'expo-router';

// Create a context to share the active filter across components
export const FilterContext = createContext({
  activeFilter: 'Today',
  setActiveFilter: (filter: string) => {},
});

// Top Header with Profile and Icons
function TopHeader() {
  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };
  
  const handleAchievementsPress = () => {
    router.push('/(tabs)/achievements');
  };

  return (
    <View style={styles.topHeader}>
      <TouchableOpacity onPress={handleProfilePress} style={styles.profileContainer}>
        <Image 
          source={require('@/assets/images/icon.png')} 
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Search size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <ShoppingBag size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAchievementsPress} style={styles.iconButton}>
          <Trophy size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Top Navigation Buttons (Horizontal Scrolling)
function TopNavButtons() {
  const { activeFilter, setActiveFilter } = useContext(FilterContext);
  const currentPath = usePathname();
  
  // Don't show buttons on the dashboard tab
  if (currentPath === '/' || currentPath === '/index' || currentPath === '/(tabs)' || currentPath === '/(tabs)/index') {
    return null;
  }
  
  const buttons = [
    { id: 'Today', label: 'Today' },
    { id: 'Premium', label: 'Premium' },
    { id: 'Mindset', label: 'Mindset' },
    { id: 'Business', label: 'Business' },
    { id: 'More', label: 'More' },
  ];
  
  const handleButtonPress = (buttonId: string): void => {
    setActiveFilter(buttonId);
  };
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.topButtonsContainer}
    >
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[
            styles.topButton,
            activeFilter === button.id && styles.topButtonActive
          ]}
          onPress={() => handleButtonPress(button.id)}
        >
          <Text style={[
            styles.topButtonLabel,
            activeFilter === button.id && styles.topButtonLabelActive
          ]}>
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Bottom Tab Bar Component for Main Navigation
function BottomTabBar() {
  const currentPath = usePathname();
  
  // Determine active tab based on current path
  const getActiveTabName = () => {
    if (currentPath === '/' || currentPath === '/index' || currentPath === '/(tabs)' || currentPath === '/(tabs)/index') {
      return 'index';
    } else if (currentPath?.includes('/cycle')) {
      return 'cycle';
    } else if (currentPath?.includes('/recovery')) {
      return 'recovery';
    } else if (currentPath?.includes('/nutrition')) {
      return 'nutrition';
    } else if (currentPath?.includes('/fitness')) {
      return 'fitness';
    } else if (currentPath?.includes('/achievements')) {
      return 'achievements';
    } else if (currentPath?.includes('/profile')) {
      return 'profile';
    }
    return '';
  };
  
  const activeTabName = getActiveTabName();
  
  const tabs = [
    { name: 'cycle', icon: Calendar, label: 'Cycle' },
    { name: 'recovery', icon: Heart, label: 'Recovery' },
    { name: 'index', icon: Home, label: 'Dashboard' },
    { name: 'nutrition', icon: Utensils, label: 'Nutrition' },
    { name: 'fitness', icon: Dumbbell, label: 'Fitness' },
  ];
  
  const handleTabPress = (tabName: string): void => {
    if (tabName === 'index') {
      router.push('/');
    } else if (['cycle', 'achievements', 'profile'].includes(tabName)) {
      router.push(`/(tabs)/${tabName}` as any);
    } else {
      router.push(`/${tabName}` as any);
    }
  };
  
  return (
    <View style={styles.bottomTabBar}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.name === activeTabName;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.name)}
          >
            <Icon size={24} color={isActive ? '#FF6B6B' : '#9CA3AF'} />
            <Text style={[
              styles.tabLabel,
              isActive && styles.activeTabLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  const [activeTab, setActiveTab] = useState('index');
  const [activeFilter, setActiveFilter] = useState('Today');
  const currentPath = usePathname();
  
  // Check if we're on an onboarding screen
  const isOnboardingScreen = currentPath?.startsWith('/onboarding');

  useEffect(() => {
    checkAndRedirect();
  }, []);

  const checkAndRedirect = async () => {
    const isOnboarded = await checkOnboardingStatus();
    if (!isOnboarded) {
      router.replace('/onboarding');
    }
  };

  return (
    <FilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      <View style={styles.container}>
        <Stack screenOptions={{ 
          headerShown: true,
          header: () => (
            <>
              <TopHeader />
              <TopNavButtons />
            </>
          )
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          <Stack.Screen name="lifestyle" />
          <Stack.Screen name="recovery" />
          <Stack.Screen name="nutrition" />
          <Stack.Screen name="fitness" />
        </Stack>
        <StatusBar style="auto" />
        {!isOnboardingScreen && <BottomTabBar />}
      </View>
    </FilterContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  topIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  topButtonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  topButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
  },
  topButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topButtonLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  topButtonLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Account for iOS home indicator
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});