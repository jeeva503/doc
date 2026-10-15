import { Platform } from 'react-native';

// No login in this task: the first seeded user is the logged-in user.
// This id is the same one the backend seed script creates.
export const CURRENT_USER_ID = '64f000000000000000000001';

// Set EXPO_PUBLIC_API_URL in app/.env to point at your backend (see README).
const defaultUrl = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
export const API_URL = process.env.EXPO_PUBLIC_API_URL || defaultUrl;
