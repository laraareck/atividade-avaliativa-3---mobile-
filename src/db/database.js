import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@myLocation:locations';

let cache = [];

export async function initDatabase() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Erro ao carregar localizações:', error);
    cache = [];
  }
  return cache;
}

export async function insertLocation({ latitude, longitude }) {
  const location = {
    id: Date.now(),
    latitude,
    longitude,
    created_at: new Date().toISOString(),
  };
  cache = [location, ...cache];
  await AsyncStorage.setItem(KEY, JSON.stringify(cache));
  return location;
}

export function getAllLocations() {
  return cache;
}