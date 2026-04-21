/**
 * FIRESTORE REALTIME SYNC
 * 
 * Gestion des listeners temps réel pour :
 * - Stocks qui changent en direct
 * - Commandes mises à jour par les secrétaires
 * - Paiements enregistrés
 * - Messages clients
 * - Notifications pushées
 * 
 * Les données restent synchronisées entre le propriétaire et les secrétaires
 */

import { db } from '../firebase-config.js';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// ===== ÉTAT GLOBAL RÉACTIF =====
// Ces variables contiennent les données en temps réel
export const realtimeData = {
  products: [],
  inventory: {},      // {depotId: { productId: qty, ... }}
  orders: [],
  clients: [],
  payments: [],
  teamMembers: [],
  notifications: [],
  unsubscribers: []   // Pour arrêter les listeners si besoin
};

// ===== CALLBACKS RÉACTIFS =====
// Fonctions appelées quand les données changent
const callbacks = {
  onProductsChange: [],
  onInventoryChange: [],
  onOrdersChange: [],
  onClientsChange: [],
  onPaymentsChange: [],
  onNotificationsChange: []
};

// ===== ENREGISTRER DES CALLBACKS =====
/**
 * S'inscrire à des changements de données
 * @param {string} dataType - 'products' | 'inventory' | 'orders' | 'clients' | 'payments' | 'notifications'
 * @param {Function} callback - (data) => { ... }
 */
export function onDataChange(dataType, callback) {
  if (callbacks[`on${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Change`]) {
    callbacks[`on${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Change`].push(callback);
    console.log(`📡 Callback enregistré pour ${dataType}`);
  }
}

// ===== APPELER LES CALLBACKS =====
function notifyDataChange(dataType, data) {
  const callbackName = `on${dataType.charAt(0).toUpperCase() + dataType.slice(1)}Change`;
  if (callbacks[callbackName]) {
    callbacks[callbackName].forEach(cb => {
      try {
        cb(data);
      } catch (err) {
        console.error(`❌ Erreur dans callback ${dataType}:`, err);
      }
    });
  }
}

// ===== 1. LISTENER : PRODUITS =====
/**
 * Écoute la collection 'products' en temps réel
 * Utile pour les mises à jour des prix, descriptions, etc.
 */
export function listenToProducts() {
  console.log('📡 Démarrage listener: products');
  
  try {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      realtimeData.products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(`✅ ${realtimeData.products.length} produits mis à jour en temps réel`);
      notifyDataChange('products', realtimeData.products);
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error('❌ Erreur listener products:', err);
    return () => {};
  }
}

// ===== 2. LISTENER : INVENTORY (STOCKS) =====
/**
 * Écoute l'inventory d'UN dépôt spécifique
 * @param {string} depotId - ID du dépôt
 */
export function listenToInventory(depotId) {
  console.log(`📡 Démarrage listener: inventory pour ${depotId}`);
  
  try {
    // Query : tous les documents dont depotId = X
    const q = query(
      collection(db, 'inventory'),
      where('depotId', '==', depotId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Organiser par productId
      realtimeData.inventory[depotId] = {};
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        realtimeData.inventory[depotId][data.productId] = data.quantity;
      });
      
      console.log(`✅ Stocks ${depotId} mis à jour en temps réel`);
      notifyDataChange('inventory', realtimeData.inventory[depotId]);
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error(`❌ Erreur listener inventory:`, err);
    return () => {};
  }
}

// ===== 3. LISTENER : COMMANDES =====
/**
 * Écoute les commandes d'UN dépôt en temps réel
 * @param {string} depotId - ID du dépôt
 */
export function listenToOrders(depotId) {
  console.log(`📡 Démarrage listener: orders pour ${depotId}`);
  
  try {
    const q = query(
      collection(db, 'orders'),
      where('depotId', '==', depotId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      realtimeData.orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Trier par date décroissante (plus récent en premier)
      realtimeData.orders.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      console.log(`✅ ${realtimeData.orders.length} commandes mises à jour en temps réel`);
      notifyDataChange('orders', realtimeData.orders);
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error('❌ Erreur listener orders:', err);
    return () => {};
  }
}

// ===== 4. LISTENER : CLIENTS =====
/**
 * Écoute les clients d'UN dépôt
 * @param {string} depotId - ID du dépôt
 */
export function listenToClients(depotId) {
  console.log(`📡 Démarrage listener: clients pour ${depotId}`);
  
  try {
    const q = query(
      collection(db, 'clients'),
      where('depotId', '==', depotId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      realtimeData.clients = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(`✅ ${realtimeData.clients.length} clients mis à jour en temps réel`);
      notifyDataChange('clients', realtimeData.clients);
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error('❌ Erreur listener clients:', err);
    return () => {};
  }
}

// ===== 5. LISTENER : PAIEMENTS =====
/**
 * Écoute les paiements enregistrés pour UN dépôt
 * @param {string} depotId - ID du dépôt
 */
export function listenToPayments(depotId) {
  console.log(`📡 Démarrage listener: payments pour ${depotId}`);
  
  try {
    const q = query(
      collection(db, 'payments'),
      where('depotId', '==', depotId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      realtimeData.payments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Trier par date décroissante
      realtimeData.payments.sort((a, b) =>
        new Date(b.recordedAt) - new Date(a.recordedAt)
      );
      
      console.log(`✅ ${realtimeData.payments.length} paiements mis à jour en temps réel`);
      notifyDataChange('payments', realtimeData.payments);
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error('❌ Erreur listener payments:', err);
    return () => {};
  }
}

// ===== 6. LISTENER : ÉQUIPE =====
/**
 * Écoute les membres de l'équipe d'UN dépôt
 * @param {string} depotId - ID du dépôt
 */
export function listenToTeam(depotId) {
  console.log(`📡 Démarrage listener: team pour ${depotId}`);
  
  try {
    const q = query(
      collection(db, 'team'),
      where('depotId', '==', depotId)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      realtimeData.teamMembers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(`✅ Équipe (${realtimeData.teamMembers.length} membres) mise à jour`);
      notifyDataChange('teamMembers', realtimeData.teamMembers);
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error('❌ Erreur listener team:', err);
    return () => {};
  }
}

// ===== 7. LISTENER : NOTIFICATIONS =====
/**
 * Écoute les notifications d'UN utilisateur
 * @param {string} userId - UID de l'utilisateur
 */
export function listenToNotifications(userId) {
  console.log(`📡 Démarrage listener: notifications pour ${userId}`);
  
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      realtimeData.notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (realtimeData.notifications.length > 0) {
        console.log(`🔔 ${realtimeData.notifications.length} nouvelles notifications`);
        notifyDataChange('notifications', realtimeData.notifications);
        
        // Optionnel : Afficher une notification navigateur
        showBrowserNotification(realtimeData.notifications[0]);
      }
    });
    
    realtimeData.unsubscribers.push(unsubscribe);
    return unsubscribe;
    
  } catch (err) {
    console.error('❌ Erreur listener notifications:', err);
    return () => {};
  }
}

// ===== 8. DÉMARRER TOUS LES LISTENERS =====
/**
 * Démarre tous les listeners pour UN dépôt et UN utilisateur
 * À appeler au chargement de l'interface privée
 * @param {string} depotId - ID du dépôt
 * @param {string} userId - UID de l'utilisateur connecté
 */
export function startAllListeners(depotId, userId) {
  console.log('🚀 Démarrage de TOUS les listeners temps réel');
  console.log(`   Dépôt: ${depotId}`);
  console.log(`   Utilisateur: ${userId}`);
  
  // Arrêter les anciens listeners d'abord
  stopAllListeners();
  
  // Démarrer les nouveaux
  listenToProducts();
  listenToInventory(depotId);
  listenToOrders(depotId);
  listenToClients(depotId);
  listenToPayments(depotId);
  listenToTeam(depotId);
  listenToNotifications(userId);
  
  console.log('✅ TOUS les listeners sont maintenant actifs');
}

// ===== 9. ARRÊTER LES LISTENERS =====
/**
 * Arrête TOUS les listeners pour libérer les ressources
 * À appeler à la déconnexion
 */
export function stopAllListeners() {
  console.log('⏹️ Arrêt de tous les listeners');
  
  realtimeData.unsubscribers.forEach((unsubscribe, index) => {
    try {
      unsubscribe();
      console.log(`   ✓ Listener ${index + 1} arrêté`);
    } catch (err) {
      console.error(`   ❌ Erreur arrêt listener ${index}:`, err);
    }
  });
  
  realtimeData.unsubscribers = [];
  console.log('✅ Tous les listeners sont arrêtés');
}

// ===== 10. NOTIFICATION NAVIGATEUR =====
/**
 * Affiche une notification navigateur
 * @param {Object} notification - Données de notification
 */
function showBrowserNotification(notification) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.message,
      icon: '🏭'
    });
  }
}

// ===== 11. DEMANDER PERMISSION NOTIFICATIONS =====
/**
 * Demande la permission pour les notifications navigateur
 */
export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('✅ Notifications navigateur activées');
      }
    });
  }
}

// ===== 12. UTILITÉ : OBTENIR LES DONNÉES ACTUELLES =====
/**
 * Retourne les produits actuels
 */
export function getProducts() {
  return realtimeData.products;
}

/**
 * Retourne l'inventaire d'un dépôt
 */
export function getInventory(depotId) {
  return realtimeData.inventory[depotId] || {};
}

/**
 * Retourne les commandes actuelles
 */
export function getOrders() {
  return realtimeData.orders;
}

/**
 * Retourne les clients actuels
 */
export function getClients() {
  return realtimeData.clients;
}

/**
 * Retourne les paiements actuels
 */
export function getPayments() {
  return realtimeData.payments;
}

/**
 * Retourne les notifications non lues
 */
export function getNotifications() {
  return realtimeData.notifications;
}

/**
 * Compte le nombre de commandes non payées
 */
export function getPendingOrdersCount() {
  return realtimeData.orders.filter(o => o.paymentStatus !== 'paid').length;
}

/**
 * Compte le nombre de notifications non lues
 */
export function getUnreadNotificationsCount() {
  return realtimeData.notifications.length;
}

/**
 * Retourne les produits en rupture de stock
 */
export function getLowStockProducts(depotId) {
  const inventory = getInventory(depotId);
  return realtimeData.products.filter(p => {
    const qty = inventory[p.id] || 0;
    return qty <= 12;
  });
}

// ===== INITIALISATION =====
console.log('✅ Module Firestore Real-Time Sync chargé');
