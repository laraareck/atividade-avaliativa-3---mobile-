import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@myLocation:theme';

export async function saveTheme(isDark) {
  try {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Erro ao salvar tema:', error);
  }
}

export async function loadTheme() {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    return value !== null ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao carregar tema:', error);
    return false;
  }
}