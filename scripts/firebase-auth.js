/**
 * Authentification Firebase
 * Remplace le système d'authentification simulé (LOGIN_DEMO)
 * Gère : Connexion, Inscription, Déconnexion, Persistance de session
 */

import { auth } from '../firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// ===== ÉTATS GLOBAUX =====
export let currentUser = null;
export let currentUserRole = null;

// ===== INITIALISER LA PERSISTANCE ===== 
// Les utilisateurs restent connectés même après fermeture du navigateur
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("❌ Erreur de persistance Firebase :", err);
});

// ===== INSCRIPTION UTILISATEUR =====
/**
 * Crée un nouveau compte utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe (min. 6 caractères)
 * @returns {Promise<Object>} L'utilisateur Firebase créé
 */
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ Utilisateur inscrit :", userCredential.user.email);
    return userCredential.user;
  } catch (err) {
    console.error("❌ Erreur d'inscription :", err.code, err.message);
    throw err;
  }
}

// ===== CONNEXION UTILISATEUR =====
/**
 * Connecte un utilisateur avec email/mot de passe
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<Object>} L'utilisateur Firebase connecté
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Connexion réussie :", userCredential.user.email);
    currentUser = userCredential.user;
    return userCredential.user;
  } catch (err) {
    console.error("❌ Erreur de connexion :", err.code, err.message);
    throw err;
  }
}

// ===== DÉCONNEXION UTILISATEUR =====
/**
 * Déconnecte l'utilisateur actuel
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    currentUser = null;
    currentUserRole = null;
    console.log("✅ Déconnexion réussie");
  } catch (err) {
    console.error("❌ Erreur de déconnexion :", err);
    throw err;
  }
}

// ===== OBTENIR L'UTILISATEUR ACTUEL =====
/**
 * Retourne l'utilisateur actuellement connecté
 * @returns {Object|null} L'utilisateur Firebase ou null
 */
export function getCurrentUser() {
  return currentUser;
}

// ===== OBTENIR LE UID DE L'UTILISATEUR =====
/**
 * Retourne l'UID unique de l'utilisateur connecté
 * @returns {string|null} L'UID ou null
 */
export function getCurrentUserUID() {
  return currentUser?.uid || null;
}

// ===== OBTENIR LE RÔLE DE L'UTILISATEUR =====
/**
 * Retourne le rôle de l'utilisateur 'admin' ou 'sec'
 * À améliorer : Charger depuis Firestore après l'étape 3
 * @returns {string|null} 'admin' | 'sec' | null
 */
export function getCurrentUserRole() {
  return currentUserRole;
}

// ===== DÉFINIR LE RÔLE (AVANT CONNEXION) =====
/**
 * Enregistre le rôle sélectionné avant la connexion
 * Ce rôle sera utilisé pour charger la bonne interface
 * @param {string} role - 'admin' ou 'sec'
 */
export function setSelectedRole(role) {
  currentUserRole = role;
  console.log(`🎭 Rôle sélectionné : ${role}`);
}

// ===== ÉCOUTER LES CHANGEMENTS D'AUTHENTIFICATION =====
/**
 * Détecte automatiquement les changements d'état de connexion
 * Appelle un callback quand l'utilisateur se connecte/déconnecte
 * @param {Function} callback - (user) => { ... }
 * @returns {Function} Pour arrêter l'écoute
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
      console.log("🔐 Utilisateur détecté :", user.email);
    } else {
      console.log("👤 Aucun utilisateur connecté");
    }
    callback(user);
  });
}

// ===== VÉRIFIER SI CONNECTÉ =====
/**
 * Retourne true si un utilisateur est connecté
 * @returns {boolean}
 */
export function isAuthenticated() {
  return currentUser !== null;
}

// ===== OBTENIR LE TOKEN D'AUTHENTIFICATION =====
/**
 * Récupère le token JWT de l'utilisateur (pour les requêtes backendh)
 * @returns {Promise<string|null>}
 */
export async function getAuthToken() {
  if (!currentUser) return null;
  try {
    return await currentUser.getIdToken();
  } catch (err) {
    console.error("❌ Erreur lors de la récupération du token :", err);
    return null;
  }
}

// ===== MESSAGES D'ERREUR FIREBASE =====
/**
 * Convertit les codes d'erreur Firebase en messages lisibles
 * @param {string} errorCode - Le code d'erreur Firebase
 * @returns {string} Message d'erreur en français
 */
export function getFirebaseErrorMessage(errorCode) {
  const errors = {
    'auth/user-not-found': 'Cet email n\'existe pas.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/email-already-in-use': 'Cet email est déjà utilisé.',
    'auth/weak-password': 'Le mot de passe est trop faible (min. 6 caractères).',
    'auth/invalid-email': 'Email invalide.',
    'auth/operation-not-allowed': 'Cette opération n\'est pas autorisée.',
    'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.'
  };
  return errors[errorCode] || 'Une erreur est survenue. Veuillez réessayer.';
}
