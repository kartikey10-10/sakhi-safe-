import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readValue<T>(key: string, fallback: T): Promise<T> {
  try { const value = await AsyncStorage.getItem(`sakhi:${key}`); return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
}
export async function writeValue<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(`sakhi:${key}`, JSON.stringify(value));
}
export async function removeValue(key: string): Promise<void> { await AsyncStorage.removeItem(`sakhi:${key}`); }
