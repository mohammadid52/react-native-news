import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (value, key = '') => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('error @storeData: ', error);
  }
};

export const readData = async (key = '') => {
  try {
    const interest = await AsyncStorage.getItem(key);
    return JSON.parse(interest);
  } catch (error) {
    console.error('error @readData: ', error);
  }
};

export const clearAll_TEST = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};
