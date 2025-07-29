import { Tabs } from 'expo-router';
import { Chrome as Home, Calendar, User, Award } from 'lucide-react-native';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          paddingBottom: 3,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarIndicatorStyle: {
          backgroundColor: '#FF6B6B',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'none',
        },
        tabBarPosition: 'top',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Home size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cycle"
        options={{
          title: 'Cycle',
          tabBarIcon: ({ color }) => (
            <Calendar size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => (
            <Award size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <User size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}