import AsyncStorage from '@react-native-community/async-storage';

const CATEGORIES = 'CATEGORIES';

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem(CATEGORIES, JSON.stringify(value));
  } catch (error) {
    console.error('error @storeInterest: ', error);
  }
};

export const readData = async () => {
  try {
    const interest = await AsyncStorage.getItem(CATEGORIES);
    return JSON.parse(interest);
  } catch (error) {
    console.error('error @readInterest: ', error);
  }
};

/*
user: {
  interest: [...categories],
  profileImage: index
}
*/
