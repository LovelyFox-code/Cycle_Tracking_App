import { useEffect, useState, createContext, useContext } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { checkOnboardingStatus } from '@/utils/storage';
import { router } from 'expo-router';
import { ShopProvider } from './ShopContext';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {
  Chrome as Home,
  Calendar,
  User,
  Award,
  Search,
  ShoppingBag,
  Trophy,
  Heart,
  Utensils,
  Dumbbell,
} from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { usePathname } from 'expo-router';
import { ThemeProvider } from '@/theme/ThemeContext';
import { useTheme } from '@/hooks/useTheme';

// Create contexts to share filter states across components
export const NutritionFilterContext = createContext({
  activeFilter: 'all',
  setActiveFilter: (filter: string) => {},
});

export const FitnessFilterContext = createContext({
  activeFilter: 'all',
  setActiveFilter: (filter: string) => {},
});

export const RecoveryFilterContext = createContext({
  activeFilter: 'all',
  setActiveFilter: (filter: string) => {},
});

// Top Header with Profile and Icons
function TopHeader() {
  const { theme } = useTheme();
  
  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };

  const handleAchievementsPress = () => {
    router.push('/(tabs)/achievements');
  };

  return (
    <View style={[styles.topHeader, { backgroundColor: theme.colors.background.card }]}>
      <TouchableOpacity
        onPress={handleProfilePress}
        style={styles.profileContainer}
      >
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.topIcons}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.background.highlight }]}>
          <Search size={24} color={theme.colors.text.light} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iconButton, { backgroundColor: theme.colors.background.highlight }]}
          onPress={() => router.push('/shop')}
        >
          <ShoppingBag size={24} color={theme.colors.text.light} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAchievementsPress}
          style={[styles.iconButton, { backgroundColor: theme.colors.background.highlight }]}
        >
          <Trophy size={24} color={theme.colors.text.light} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Tab-specific Filter Buttons (Horizontal Scrolling)
function TopNavButtons() {
  const { theme } = useTheme();
  const { activeFilter: nutritionFilter, setActiveFilter: setNutritionFilter } =
    useContext(NutritionFilterContext);
  const { activeFilter: fitnessFilter, setActiveFilter: setFitnessFilter } =
    useContext(FitnessFilterContext);
  const { activeFilter: recoveryFilter, setActiveFilter: setRecoveryFilter } =
    useContext(RecoveryFilterContext);
  const currentPath = usePathname();

  // Don't show buttons on the dashboard tab or tabs that don't need filters
  if (
    currentPath === '/' ||
    currentPath === '/index' ||
    currentPath === '/(tabs)' ||
    currentPath === '/(tabs)/index' ||
    currentPath === '/(tabs)/profile' ||
    currentPath === '/(tabs)/achievements'
  ) {
    return null;
  }

  // Define buttons based on current path
  let buttons = [];
  let activeFilter = 'all';
  let handleButtonPress = (buttonId: string): void => {};

  if (currentPath === '/nutrition') {
    buttons = [
      { id: 'all', label: 'All' },
      { id: 'vegan', label: 'Vegan' },
      { id: 'vegetarian', label: 'Vegetarian' },
      { id: 'pescetarian', label: 'Pescetarian' },
    ];
    activeFilter = nutritionFilter;
    handleButtonPress = setNutritionFilter;
  } else if (currentPath === '/fitness') {
    buttons = [
      { id: 'all', label: 'All' },
      { id: 'by_phase', label: 'By Phase' },
      { id: 'yoga', label: 'Yoga' },
      { id: 'pilates', label: 'Pilates' },
      { id: 'weights', label: 'Weights' },
    ];
    activeFilter = fitnessFilter;
    handleButtonPress = setFitnessFilter;
  } else if (currentPath === '/recovery') {
    buttons = [
      { id: 'all', label: 'All' },
      { id: 'sleep', label: 'Sleep' },
      { id: 'stretching', label: 'Stretching' },
      { id: 'meditation', label: 'Meditation' },
    ];
    activeFilter = recoveryFilter;
    handleButtonPress = setRecoveryFilter;
  } else {
    // No filters for other screens
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.topButtonsContainer, { backgroundColor: theme.colors.background.card }]}
    >
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[
            styles.topButton,
            { backgroundColor: theme.colors.background.highlight },
            activeFilter === button.id && [
              styles.topButtonActive,
              { backgroundColor: theme.colors.background.card }
            ],
          ]}
          onPress={() => handleButtonPress(button.id)}
        >
          <Text
            style={[
              styles.topButtonLabel,
              { color: theme.colors.text.muted },
              activeFilter === button.id && [
                styles.topButtonLabelActive,
                { color: theme.colors.text.primary }
              ],
            ]}
          >
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Bottom Tab Bar Component for Main Navigation
function BottomTabBar() {
  const { theme } = useTheme();
  const currentPath = usePathname();

  // Determine active tab based on current path
  const getActiveTabName = () => {
    if (
      currentPath === '/' ||
      currentPath === '/index' ||
      currentPath === '/(tabs)' ||
      currentPath === '/(tabs)/index'
    ) {
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
    <View style={[styles.bottomTabBar, { 
      backgroundColor: theme.colors.background.card,
      borderTopColor: theme.colors.background.highlight 
    }]}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.name === activeTabName;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.name)}
          >
            <Icon size={24} color={isActive ? theme.colors.primary : theme.colors.text.light} />
            <Text style={[
              styles.tabLabel, 
              { color: theme.colors.text.light },
              isActive && [
                styles.activeTabLabel,
                { color: theme.colors.primary }
              ]
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Wrapper component that uses the theme
function AppWithTheme() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('index');
  const [nutritionFilter, setNutritionFilter] = useState('all');
  const [fitnessFilter, setFitnessFilter] = useState('all');
  const [recoveryFilter, setRecoveryFilter] = useState('all');
  const currentPath = usePathname();

  // Check if we're on an onboarding screen
  const isOnboardingScreen = currentPath?.startsWith('/onboarding');

  // Check if we're on a detail page that should hide the tab bar
  const shouldHideTabBar = () => {
    return currentPath?.includes('/nutrition/');
  };

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
    <NutritionFilterContext.Provider
      value={{
        activeFilter: nutritionFilter,
        setActiveFilter: setNutritionFilter,
      }}
    >
      <FitnessFilterContext.Provider
        value={{
          activeFilter: fitnessFilter,
          setActiveFilter: setFitnessFilter,
        }}
      >
        <RecoveryFilterContext.Provider
          value={{
            activeFilter: recoveryFilter,
            setActiveFilter: setRecoveryFilter,
          }}
        >
          <View style={[styles.container, { backgroundColor: theme.colors.background.main }]}>
            <Stack
              screenOptions={{
                headerShown: true,
                header: () => (
                  <>
                    <TopHeader />
                    <TopNavButtons />
                  </>
                ),
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="+not-found"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="recovery" />
              <Stack.Screen name="nutrition" />
              <Stack.Screen
                name="nutrition/[slug]"
                options={{ headerShown: true }}
              />
              <Stack.Screen name="fitness" />
              <Stack.Screen name="shop" />
              <Stack.Screen
                name="shop/[category]"
                options={{ headerShown: true }}
              />
            </Stack>
            <StatusBar style={theme.colors.background.main === '#121212' ? 'light' : 'dark'} />
            {!isOnboardingScreen && !shouldHideTabBar() && <BottomTabBar />}
          </View>
        </RecoveryFilterContext.Provider>
      </FitnessFilterContext.Provider>
    </NutritionFilterContext.Provider>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ShopProvider>
          <AppWithTheme />
        </ShopProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  topButtonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
  },
  topButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topButtonLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  topButtonLabelActive: {
    fontWeight: '600',
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
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
    marginTop: 4,
  },
  activeTabLabel: {
    fontWeight: '600',
  },
});