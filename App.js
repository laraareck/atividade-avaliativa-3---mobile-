import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Switch,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { initDatabase, insertLocation, getAllLocations } from './src/db/database';
import { saveTheme, loadTheme } from './src/storage/theme';
import { getCurrentLocation } from './src/hooks/useLocation';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initDatabase().then(setLocations);
    loadTheme().then(setIsDark);
  }, []);

  const toggleTheme = (value) => {
    setIsDark(value);
    saveTheme(value);
  };

  const handleCapture = async () => {
    try {
      setLoading(true);
      const coords = await getCurrentLocation();
      const saved = await insertLocation(coords);
      setLocations((prev) => [saved, ...prev]);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const theme = isDark ? styles.dark : styles.light;

  return (
    <SafeAreaView style={[styles.container, theme.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, theme.text]}>My Location</Text>
        <View style={styles.switchRow}>
          <Text style={theme.text}>Dark mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      <Button
        title={loading ? 'Capturando...' : 'Capturar localização'}
        onPress={handleCapture}
        disabled={loading}
      />

      <FlatList
        data={locations}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={[styles.empty, theme.text]}>Nenhuma localização salva.</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, theme.item]}>
            <Text style={theme.text}>Lat: {item.latitude.toFixed(6)}</Text>
            <Text style={theme.text}>Lng: {item.longitude.toFixed(6)}</Text>
            <Text style={[styles.date, theme.text]}>
              {new Date(item.created_at).toLocaleString('pt-BR')}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 24 },
  item: { padding: 12, borderRadius: 8, marginTop: 12 },
  date: { fontSize: 12, marginTop: 4, opacity: 0.7 },
  light: {
    container: { backgroundColor: '#fff' },
    text: { color: '#111' },
    item: { backgroundColor: '#f0f0f0' },
  },
  dark: {
    container: { backgroundColor: '#121212' },
    text: { color: '#eee' },
    item: { backgroundColor: '#1e1e1e' },
  },
});