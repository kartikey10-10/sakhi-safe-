/** Demo adapters. Replace implementations behind these interfaces with authorized services. */
export const authService = { async signIn(_email: string, _password: string) { return {mode:'guest' as const, connected:false}; } };
export const contactService = { async saveLocal<T>(key: string, value: T) { const storage = require('@react-native-async-storage/async-storage').default; await storage.setItem(key, JSON.stringify(value)); }, async loadLocal<T>(key: string): Promise<T|null> { const storage = require('@react-native-async-storage/async-storage').default; const v=await storage.getItem(key); return v?JSON.parse(v):null; } };
export const sosService = { async createAlert() { return {state:'queued' as const, demo:true, sent:false}; } };
export const locationService = { async getOneTimeLocation() { return {available:false, reason:'Location sharing is not configured'}; } };
export const bluetoothService = { async connect() { return {connected:false, demo:true}; } };
export const deviceStatusService = { async getStatus() { return {connected:false,battery:null,voiceModule:'unavailable',speaker:'unavailable',sensors:'unavailable',lastSync:null,demo:true}; } };
export const notificationService = { async scheduleDemoNotice() { return {configured:false}; } };
export const learningService = { async getLessons() { return []; } };
export const communityService = { async getStories() { return {demo:true, stories:[]}; } };
