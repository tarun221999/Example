// auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('User stored successfully');
    } catch (error) {
      console.error('Error storing user:', error);
    }
  };

  // Function to retrieve the user object from AsyncStorage
export const getUser = async (key) => {
    try {
        const userDetailString = await AsyncStorage.getItem(key);
        if (userDetailString !== null) {
          const userDetailObject = JSON.parse(userDetailString);
          return userDetailObject;
        } else {
          console.log('User detail not found in storage');
        }
      } catch (error) {
        console.error('Error retrieving user detail:', error);
      }
};