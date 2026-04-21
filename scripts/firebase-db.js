/**
 * Gestion de la Base de Données Firestore
 * À implémenter complètement à l'étape 3
 * Pour l'instant : fonctions stub avec localStorage comme fallback
 */

import { db } from '../firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ===== COLLECTIONS FIRESTORE =====
const COLLECTIONS = {
  users: 'users',           // Profils utilisateurs et rôles
  depots: 'depots',         // Informations des dépôts
  products: 'products',     // Catalogue produits
  orders: 'orders',         // Commandes
  payments: 'payments',     // Paiements/versements
  suppliers: 'suppliers',   // Fournisseurs
  inventory: 'inventory',   // Stock en temps réel
  messages: 'messages'      // Messages clients
};

// ===== OPÉRATIONS UTILISATEURS =====

/**
 * Crée un profil utilisateur dans Firestore
 * @param {string} uid - UID Firebase de l'utilisateur
 * @param {Object} userData - Données utilisateur
 * @returns {Promise<void>}
 */
export async function createUserProfile(uid, userData) {
  try {
    await setDoc(doc(db, COLLECTIONS.users, uid), {
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      role: userData.role || 'sec',  // 'admin' ou 'sec'
      depotId: userData.depotId || null,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      active: true
    });
    console.log(`✅ Profil créé pour ${uid}`);
  } catch (err) {
    console.error("❌ Erreur création profil :", err);
    throw err;
  }
}

/**
 * Récupère le profil d'un utilisateur
 * @param {string} uid - UID Firebase
 * @returns {Promise<Object|null>}
 */
export async function getUserProfile(uid) {
  try {
    const docSnap = await getDoc(doc(db, COLLECTIONS.users, uid));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (err) {
    console.error("❌ Erreur chargement profil :", err);
    return null;
  }
}

/**
 * Met à jour le profil d'un utilisateur
 * @param {string} uid - UID Firebase
 * @param {Object} updates - Champs à mettre à jour
 * @returns {Promise<void>}
 */
export async function updateUserProfile(uid, updates) {
  try {
    updates.updatedAt = Timestamp.now();
    await updateDoc(doc(db, COLLECTIONS.users, uid), updates);
    console.log(`✅ Profil mis à jour : ${uid}`);
  } catch (err) {
    console.error("❌ Erreur mise à jour profil :", err);
    throw err;
  }
}

// ===== OPÉRATIONS DÉPÔTS =====

/**
 * Crée un dépôt dans Firestore
 * @param {string} ownerId - UID du propriétaire
 * @param {Object} depotData - Données du dépôt
 * @returns {Promise<string>} L'ID du dépôt créé
 */
export async function createDepot(ownerId, depotData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.depots), {
      ownerId,
      name: depotData.name,
      region: depotData.region,
      commune: depotData.commune,
      address: depotData.address || '',
      ninea: depotData.ninea || '',
      products: depotData.products || [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      verified: false,
      active: true
    });
    console.log(`✅ Dépôt créé : ${docRef.id}`);
    return docRef.id;
  } catch (err) {
    console.error("❌ Erreur création dépôt :", err);
    throw err;
  }
}

/**
 * Récupère tous les dépôts (pour l'annuaire public)
 * @returns {Promise<Array>}
 */
export async function getAllDepots() {
  try {
    const q = query(collection(db, COLLECTIONS.depots), where('active', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("❌ Erreur chargement dépôts :", err);
    return [];
  }
}

/**
 * Récupère un dépôt spécifique
 * @param {string} depotId - ID du dépôt
 * @returns {Promise<Object|null>}
 */
export async function getDepot(depotId) {
  try {
    const docSnap = await getDoc(doc(db, COLLECTIONS.depots, depotId));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (err) {
    console.error("❌ Erreur chargement dépôt :", err);
    return null;
  }
}

// ===== OPÉRATIONS COMMANDES =====

/**
 * Crée une commande
 * @param {Object} orderData
 * @returns {Promise<string>} L'ID de la commande
 */
export async function createOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.orders), {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: orderData.status || 'pending'  // pending, confirmed, delivered, cancelled
    });
    console.log(`✅ Commande créée : ${docRef.id}`);
    return docRef.id;
  } catch (err) {
    console.error("❌ Erreur création commande :", err);
    throw err;
  }
}

/**
 * Récupère les commandes d'un dépôt
 * @param {string} depotId
 * @returns {Promise<Array>}
 */
export async function getOrdersByDepot(depotId) {
  try {
    const q = query(collection(db, COLLECTIONS.orders), where('depotId', '==', depotId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("❌ Erreur chargement commandes :", err);
    return [];
  }
}

// ===== LISTENERS EN TEMPS RÉEL =====

/**
 * Écoute les commandes d'un dépôt en temps réel
 * @param {string} depotId
 * @param {Function} callback - (orders) => { ... }
 * @returns {Function} Pour arrêter l'écoute
 */
export function onOrdersChange(depotId, callback) {
  try {
    const q = query(collection(db, COLLECTIONS.orders), where('depotId', '==', depotId));
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(orders);
    });
  } catch (err) {
    console.error("❌ Erreur listener commandes :", err);
    return () => {};
  }
}

/**
 * Écoute l'inventaire d'un dépôt en temps réel
 * @param {string} depotId
 * @param {Function} callback
 * @returns {Function}
 */
export function onInventoryChange(depotId, callback) {
  try {
    const q = query(collection(db, COLLECTIONS.inventory), where('depotId', '==', depotId));
    return onSnapshot(q, (snapshot) => {
      const inventory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(inventory);
    });
  } catch (err) {
    console.error("❌ Erreur listener inventaire :", err);
    return () => {};
  }
}

// ===== FALLBACK LOCALSTORAGE (POUR DÉVELOPPEMENT) =====
// Utile avant la mise en place complète de Firestore

export const LocalStorageSync = {
  /**
   * Synthétise les données localStorage avec Firestore
   * À utiliser temporairement pendant le développement
   */
  async syncToFirestore(collection, key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`📍 ${collection} sauvegardé en localStorage`);
      // À améliorer : Envoyer à Firestore aussi
    } catch (err) {
      console.error("❌ Erreur sync localStorage :", err);
    }
  },

  async getFromLocalStorage(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (err) {
      console.error("❌ Erreur récupération localStorage :", err);
      return defaultValue;
    }
  }
};

console.log('✅ Module Firestore chargé');
