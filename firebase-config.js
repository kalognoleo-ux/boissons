/**
 * Configuration Firebase
 * ⚠️ ATTENTION : Cette clé API est exposée au frontend (c'est normal pour Firebase).
 * Elle n'expose aucune donnée sensible seule. La sécurité est assurée via Firestore Security Rules.
 * 
 * À REMPLACER : Complétez les valeurs depuis Firebase Console > Paramètres du Projet > Applications > Web
 */

const firebaseConfig = {
  apiKey: "AIzaSyAbgYorCDgE5q6UZHTDlGRoOVKTqJcqlA8",
  authDomain: "boissons-e6b9d.firebaseapp.com",
  projectId: "boissons-e6b9d",
  storageBucket: "boissons-e6b9d.firebasestorage.app",
  messagingSenderId: "513224180367",
  appId: "1:513224180367:web:430f3d2a902d57cf6966fa"
};

// ===== INITIALISATION FIREBASE =====
// Importez les modules Firebase (chargés via <script> dans index.html)
// https://firebase.google.com/docs/web/setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Exporter pour utilisation dans les autres modules
export { auth, db, app };

// ===== GESTION DU THÈME =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Utilisateur connecté :", user.email);
    // L'utilisateur est connecté
    // À améliorer : Charger le rôle et configurer l'interface
  } else {
    console.log("❌ Aucun utilisateur connecté");
    // Rediriger vers l'écran de connexion
  }
});
