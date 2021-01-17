import AsyncStorage from '@react-native-community/async-storage';

const USER_DATA = 'USER_DATA';

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem(USER_DATA, JSON.stringify(value));
  } catch (error) {
    console.error('error @storeData: ', error);
  }
};

export const readData = async () => {
  try {
    const interest = await AsyncStorage.getItem(USER_DATA);
    return JSON.parse(interest);
  } catch (error) {
    console.error('error @readData: ', error);
  }
};

export const addProfileIdx = async (value) => {
  try {
    const previousValue = await AsyncStorage.getItem(USER_DATA);
    const parsed = JSON.parse(previousValue);
    if (parsed !== null) {
      const newData = { ...parsed, profileImage: value };
      await AsyncStorage.setItem(USER_DATA, JSON.stringify(newData));
    }
    return null;
  } catch (error) {
    console.error('error @mergeData: ', error);
  }
};

export const clearAll_TEST = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};
