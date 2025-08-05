// import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60, // Add padding to account for bottom tab bar
  },
});
