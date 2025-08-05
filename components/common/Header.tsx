// components/common/Header.tsx
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Search, ShoppingBag, Trophy } from 'lucide-react-native';
import { colors, spacing, typography } from '@/styles/theme';
import { router } from 'expo-router';

type HeaderProps = {
  greeting?: string;
  subtitle?: string;
  showProfileIcon?: boolean;
  showIcons?: boolean;
  style?: ViewStyle;
};

export default function Header({
  greeting,
  subtitle,
  showProfileIcon = true,
  showIcons = true,
  style,
}: HeaderProps) {
  const handleProfilePress = () => {
    router.push('/(tabs)/profile');
  };

  const handleAchievementsPress = () => {
    router.push('/(tabs)/achievements');
  };

  return (
    <View style={[styles.header, style]}>
      <View style={styles.textContainer}>
        {greeting && <Text style={styles.greeting}>{greeting}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.rightContainer}>
        {showIcons && (
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={24} color={colors.text.light} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/shop')}
            >
              <ShoppingBag size={24} color={colors.text.light} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAchievementsPress}
              style={styles.iconButton}
            >
              <Trophy size={24} color={colors.text.light} />
            </TouchableOpacity>
          </View>
        )}

        {showProfileIcon && (
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.profileContainer}
          >
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.m,
    paddingTop: spacing.s,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.m,
    color: colors.text.muted,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: spacing.s,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: spacing.xs,
    marginLeft: spacing.s,
  },
});