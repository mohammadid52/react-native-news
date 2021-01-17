import AsyncStorage from '@react-native-community/async-storage';

const CATEGORIES = 'CATEGORIES';

export const storeInterest = async (value) => {
  try {
    await AsyncStorage.setItem(CATEGORIES, value);
  } catch (error) {
    console.error('error @storeInterest: ', error);
  }
};

export const readInterest = async () => {
  try {
    const interest = await AsyncStorage.getItem(CATEGORIES);
    return interest;
  } catch (error) {
    console.error('error @readInterest: ', error);
  }
};
