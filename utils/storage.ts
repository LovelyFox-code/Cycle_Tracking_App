import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = '@cyclesync_user_data';

export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const updateUserPoints = async (pointsToAdd) => {
  try {
    const userData = await getUserData();
    if (userData) {
      userData.totalPoints = (userData.totalPoints || 0) + pointsToAdd;
      await saveUserData(userData);
    }
  } catch (error) {
    console.error('Error updating points:', error);
  }
};

export const completeTask = async (taskType) => {
  try {
    const userData = await getUserData();
    if (userData) {
      const today = new Date().toDateString();
      if (!userData.completedTasks) {
        userData.completedTasks = {};
      }
      if (!userData.completedTasks[today]) {
        userData.completedTasks[today] = [];
      }
      if (!userData.completedTasks[today].includes(taskType)) {
        userData.completedTasks[today].push(taskType);
        await saveUserData(userData);
      }
    }
  } catch (error) {
    console.error('Error completing task:', error);
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export const checkOnboardingStatus = async () => {
  try {
    const userData = await getUserData();
    return userData !== null;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};