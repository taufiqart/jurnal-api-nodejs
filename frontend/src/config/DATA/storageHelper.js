import AsyncStorage from '@react-native-async-storage/async-storage';

// function menyimpan data ke local storage
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error storing data', error);
  }
};

// function mendapatkan data dari local storage dengan key
export const getItemFor = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log('Error getting data', error);
  }
};

// function menhapus data dari local storage dengan key
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error getting data', error);
  }
};
