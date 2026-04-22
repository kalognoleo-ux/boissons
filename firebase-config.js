/**
 * Firebase Configuration - Modern npm approach
 * ⚠️ ATTENTION : Cette clé API est exposée au frontend (c'est normal pour Firebase).
 * Elle n'expose aucune donnée sensible seule. La sécurité est assurée via Firestore Security Rules.
 * 
 * Environment variables chargées depuis .env
 */

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other modules
export { auth, db, app };

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User connected:", user.email);
  } else {
    console.log("❌ No user connected");
  }
});
