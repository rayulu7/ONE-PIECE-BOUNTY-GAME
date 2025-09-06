// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug logging for environment variables
console.log('🔍 Firebase Config Status:');
console.log('API Key present:', !!firebaseConfig.apiKey);
console.log('Auth Domain present:', !!firebaseConfig.authDomain);
console.log('Project ID present:', !!firebaseConfig.projectId);
console.log('Storage Bucket present:', !!firebaseConfig.storageBucket);
console.log('Messaging Sender ID present:', !!firebaseConfig.messagingSenderId);
console.log('App ID present:', !!firebaseConfig.appId);

// Check if all required config values are present
const requiredConfig = ['apiKey', 'authDomain', 'projectId'];
const missingConfig = requiredConfig.filter(key => !firebaseConfig[key]);

if (missingConfig.length > 0) {
  console.error('❌ Missing Firebase config values:', missingConfig);
} else {
  console.log('✅ All required Firebase config values are present');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore with better error handling
let db;
try {
  db = getFirestore(app);
  console.log('✅ Firestore initialized successfully');
} catch (error) {
  console.error('❌ Firestore initialization failed:', error);
}

// Initialize Storage
let storage;
try {
  storage = getStorage(app);
  console.log('✅ Storage initialized successfully');
} catch (error) {
  console.error('❌ Storage initialization failed:', error);
}

export { auth, db, storage };
