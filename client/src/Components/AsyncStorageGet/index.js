import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function GetAsync(key){
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.error('Error getting data:', e);
    }
  };