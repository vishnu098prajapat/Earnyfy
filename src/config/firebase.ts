import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDKdypRrbqq3jtBeAjLF2D-Dk7Sb7gGhtM",
  authDomain: "earnyfy-b3f42.firebaseapp.com",
  projectId: "earnyfy-b3f42",
  storageBucket: "earnyfy-b3f42.firebasestorage.app",
  messagingSenderId: "748235331527",
  appId: "1:748235331527:web:6b070e3dccefbd79cbabe2",
  measurementId: "G-KHC0B3BZ91"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence set successfully
    console.log('Firebase persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

// Add scopes for additional permissions
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');

// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
}); 