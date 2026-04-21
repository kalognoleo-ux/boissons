/**
 * EXEMPLE D'INTÉGRATION FIREBASE DANS APP.JS
 * 
 * Ce fichier montre comment adapter votre code d'authentification simulée
 * pour utiliser Firebase Authentication à la place du système en dur.
 * 
 * À intégrer progressivement dans scripts/app.js lors de l'Étape 2
 */

// ===== IMPORTS FIREBASE =====
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  getCurrentUserUID,
  onAuthChange,
  isAuthenticated,
  setSelectedRole,
  getFirebaseErrorMessage
} from './firebase-auth.js';

// ===== EXEMPLE 1 : REMPLACER LA CONNEXION EN DUR =====
// AVANT (avec LOGIN_DEMO) :
/*
function doLogin() {
  const email = document.getElementById('l-email').value;
  const pass = document.getElementById('l-pass').value;
  const role = getCurrentRole();
  
  // Vérifier si les identifiants correspondent à LOGIN_DEMO
  if (LOGIN_DEMO[role]?.email === email && LOGIN_DEMO[role]?.pass === pass) {
    // Connexion réussie
    loadAppInterface(role);
  } else {
    // Erreur
    showError('Email ou mot de passe incorrect');
  }
}
*/

// APRÈS (avec Firebase) :
async function doLoginWithFirebase() {
  const email = document.getElementById('l-email').value;
  const password = document.getElementById('l-pass').value;
  
  try {
    // Appeler Firebase directement
    const user = await loginUser(email, password);
    
    // Le rôle doit être récupéré depuis Firestore (Étape 3)
    // Pour l'instant, on utilise le rôle sélectionné
    const selectedRole = getCurrentRole();  // 'admin' ou 'sec'
    setSelectedRole(selectedRole);
    
    // Charger l'interface
    await loadAppInterfaceWithFirebase(user, selectedRole);
    
  } catch (error) {
    const errorMsg = getFirebaseErrorMessage(error.code);
    showLoginError(errorMsg);
    console.error("Erreur connexion :", error);
  }
}

// ===== EXEMPLE 2 : REMPLACER L'INSCRIPTION =====
// AVANT (saving en localStorage) :
/*
function regSubmit() {
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-pass').value;
  
  // Créer un objet utilisateur en dur
  const newUser = {
    id: generateId(),
    email: email,
    password: pass,  // ⚠️ JAMAIS faire ça en vrai !
    role: 'admin'
  };
  
  // Sauvegarder en localStorage
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
}
*/

// APRÈS (avec Firebase) :
async function regSubmitWithFirebase() {
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-pass').value;
  const firstName = document.getElementById('reg-prenom').value;
  const lastName = document.getElementById('reg-nom').value;
  const depotName = document.getElementById('reg-depot').value;
  const phone = document.getElementById('reg-tel').value;
  
  try {
    // 1. Créer le compte Firebase
    const user = await registerUser(email, password);
    console.log("✅ Compte créé :", user.uid);
    
    // 2. (À compléter Étape 2) Créer le profil utilisateur dans Firestore
    // import { createUserProfile } from './firebase-db.js';
    // await createUserProfile(user.uid, {
    //   email: email,
    //   firstName: firstName,
    //   lastName: lastName,
    //   phone: phone,
    //   role: 'admin',
    //   depotId: null  // À affecter après création du dépôt
    // });
    
    // 3. (À compléter Étape 2) Créer le dépôt dans Firestore
    // import { createDepot } from './firebase-db.js';
    // const depotId = await createDepot(user.uid, {
    //   name: depotName,
    //   region: document.getElementById('reg-region').value,
    //   commune: document.getElementById('reg-commune').value,
    //   address: document.getElementById('reg-adresse').value
    // });
    
    showRegistrationSuccess();
    
  } catch (error) {
    const errorMsg = getFirebaseErrorMessage(error.code);
    showRegistrationError(errorMsg);
    console.error("Erreur inscription :", error);
  }
}

// ===== EXEMPLE 3 : INITIALISER L'ÉCOUTE D'AUTHENTIFICATION =====
// Placer cette fonction au démarrage de app.js
function initializeAuthListener() {
  onAuthChange((user) => {
    if (user) {
      // L'utilisateur est connecté
      console.log("🔐 Utilisateur connecté :", user.email);
      
      // À compléter Étape 2-3 :
      // - Charger le rôle depuis Firestore
      // - Charger les données du dépôt
      // - Charger les commandes en temps réel
      
      // Afficher l'interface privée
      showPrivateInterface();
    } else {
      // Pas d'utilisateur connecté
      console.log("👤 Utilisateur déconnecté");
      
      // Afficher l'écran de connexion
      showLoginInterface();
    }
  });
}

// ===== EXEMPLE 4 : REMPLACER LOGOUTDEMO PAR FIREBASELOGOUT =====
async function doLogoutWithFirebase() {
  try {
    await logoutUser();
    
    // Nettoyer les données locales
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('currentRole');
    
    // Retourner à l'écran public
    showPublicInterface();
    
  } catch (error) {
    console.error("Erreur déconnexion :", error);
  }
}

// ===== HELPER : AFFICHE L'INTERFACE PRIVÉE =====
function showPrivateInterface() {
  const publicHome = document.getElementById('public-home');
  const privateApp = document.getElementById('app');
  const loginDiv = document.getElementById('login');
  
  publicHome.style.display = 'none';
  loginDiv.style.display = 'none';
  privateApp.style.display = 'block';
}

// ===== HELPER : AFFICHE L'ÉCRAN DE CONNEXION =====
function showLoginInterface() {
  const publicHome = document.getElementById('public-home');
  const privateApp = document.getElementById('app');
  const loginDiv = document.getElementById('login');
  
  publicHome.style.display = 'none';
  loginDiv.style.display = 'block';
  privateApp.style.display = 'none';
}

// ===== HELPER : AFFICHE L'INTERFACE PUBLIQUE =====
function showPublicInterface() {
  const publicHome = document.getElementById('public-home');
  const privateApp = document.getElementById('app');
  const loginDiv = document.getElementById('login');
  
  publicHome.style.display = 'block';
  loginDiv.style.display = 'none';
  privateApp.style.display = 'none';
}

// ===== AU DÉMARRAGE DE APP.JS =====
// Ajouter ceci en début de votre app.js :
/*
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DepotConnect Sénégal - Démarrage');
  
  // Initialiser l'écoute d'authentification Firebase
  initializeAuthListener();
  
  // Le reste de votre code...
});
*/

// ===== CONVERSION DU STOCKAGE LOCALSTORAGE → FIRESTORE =====
// Pour copier vos données existantes vers Firebase :

async function migrateLocalStorageToFirestore() {
  try {
    // Récupérer les données de localStorage
    const commands = JSON.parse(localStorage.getItem('COMMAND_HISTORY') || '[]');
    const clients = JSON.parse(localStorage.getItem('CLIENTS') || '[]');
    const products = JSON.parse(localStorage.getItem('DATA_PRODUITS') || '[]');
    
    console.log("📊 Données trouvées :");
    console.log("  - Commandes :", commands.length);
    console.log("  - Clients :", clients.length);
    console.log("  - Produits :", products.length);
    
    // À compléter Étape 3 : Envoyer ces données à Firestore
    // for (let cmd of commands) {
    //   await createOrder(cmd);
    // }
    
  } catch (error) {
    console.error("Erreur migration :", error);
  }
}

// ===== DIFFÉRENCES CLÉS : AVANT → APRÈS =====
/*

AVANT (localStorage) :
├── Données en dur dans le code (LOGIN_DEMO, CFG, DEPOTS)
├── Authentification simulée (vérification d'email/pass)
├── Données stockées en localStorage (petit, lent, pas sécurisé)
└── Pas de synchronisation temps réel

APRÈS (Firebase) :
├── Authenticaiton via Firebase (sécurisée)
├── Base de données Firestore (scalable, temps réel)
├── Persistance automatique (cloud)
├── Synchronisation en temps réel vs autres utilisateurs
└── Security Rules (contrôle d'accès fin)

*/

console.log('✅ Module intégration Firebase chargé');
