import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStorage(key, accessToken) {
  await AsyncStorage.setItem(key, JSON.stringify(accessToken));
}

export const getStorage = async (key) => {
  return await AsyncStorage.getItem(key).then((result) => {
    try {
      return JSON.parse(result);
    } catch (e) {
      throw Error(e);
    }
  });
};

export async function removeStorage(key) {
  await AsyncStorage.removeItem(key);
}
