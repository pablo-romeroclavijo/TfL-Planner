import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function CreateAsync(key, value){
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Error storing data:', e);
    }
  };