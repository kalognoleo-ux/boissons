/**
 * EXEMPLE D'INTÉGRATION : REALTIME SYNC DANS APP.JS
 * 
 * Adaptetions à faire dans scripts/app.js pour utiliser la synchronisation temps réel
 */

// ===== IMPORTS NÉCESSAIRES =====
import {
  startAllListeners,
  stopAllListeners,
  onDataChange,
  getOrders,
  getClients,
  getInventory,
  getPayments,
  getNotifications,
  getPendingOrdersCount,
  getUnreadNotificationsCount,
  getLowStockProducts
} from './firebase-realtime.js';

// ===== VARIABLES GLOBALES (remplacer les anciennes) =====
// Au lieu de charger une seule fois depuis localStorage
// let DATA_PRODUITS = JSON.parse(...);
// let COMMAND_HISTORY = JSON.parse(...);

// On utilise maintenant les données réactives de firebase-realtime.js

// ===== 1. DÉMARRER SYNCHRONISATION AU LOGIN =====

/**
 * ADAPTER : fonction doLogin() dans votre app.js
 * 
 * AVANT (avec localStorage) :
 *   function doLogin() { ... loadAppInterface(role); }
 * 
 * APRÈS (avec Firestore temps réel) :
 */
async function doLoginWithRealtime() {
  const email = document.getElementById('l-email').value;
  const password = document.getElementById('l-pass').value;
  
  try {
    // 1. Authentifier (Étape 2)
    const user = await loginUser(email, password);
    console.log("✅ Authentification réussie");
    
    // 2. Récupérer le profil utilisateur
    const profile = await getUserProfile(user.uid);
    const depotId = profile.depotId;
    const userRole = profile.role; // 'admin' ou 'sec'
    
    // 3. DÉMARRER LA SYNCHRONISATION TEMPS RÉEL 🔄
    console.log('🚀 Démarrage synchronisation temps réel');
    startAllListeners(depotId, user.uid);
    
    // 4. Enregistrer les callbacks pour les changements
    registerRealtimeCallbacks();
    
    // 5. Afficher l'interface privée
    await loadAppInterface(userRole);
    
  } catch (error) {
    const errorMsg = getFirebaseErrorMessage(error.code);
    showLoginError(errorMsg);
  }
}

// ===== 2. ENREGISTRER LES CALLBACKS DE SYNCHRONISATION =====

/**
 * Enregistre les callbacks qui se déclenchent quand les données changent
 * À appeler juste après startAllListeners()
 */
function registerRealtimeCallbacks() {
  console.log('📡 Enregistrement des callbacks temps réel');
  
  // ===== CALLBACK : Commandes mises à jour =====
  onDataChange('orders', (orders) => {
    console.log('📋 Commandes mises à jour :', orders.length);
    
    // 1. Mettre à jour le tableau des commandes
    if (document.getElementById('orders-table')) {
      renderOrdersTable(orders);
    }
    
    // 2. Mettre à jour les statistiques du dashboard
    updateDashboardStats(orders);
    
    // 3. Mettre à jour le badge "commandes en attente"
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    updatePendingBadge(pendingCount);
  });
  
  // ===== CALLBACK : Inventaire (stocks) mis à jour =====
  onDataChange('inventory', (inventory) => {
    console.log('📦 Inventaire mis à jour');
    
    // 1. Rafraîchir tableau stocks
    if (document.getElementById('stocks-table')) {
      renderInventoryTable(inventory);
    }
    
    // 2. Afficher alerte stock bas
    const lowStockProducts = getLowStockProducts(currentDepotId);
    if (lowStockProducts.length > 0) {
      showLowStockAlert(lowStockProducts);
    } else {
      hideLowStockAlert();
    }
  });
  
  // ===== CALLBACK : Clients mis à jour =====
  onDataChange('clients', (clients) => {
    console.log('👥 Clients mises à jour :', clients.length);
    
    // Rafraîchir le tableau des clients
    if (document.getElementById('clients-table')) {
      renderClientsTable(clients);
    }
  });
  
  // ===== CALLBACK : Paiements enregistrés =====
  onDataChange('payments', (payments) => {
    console.log('💸 Paiements mises à jour :', payments.length);
    
    // Rafraîchir tableau paiements
    if (document.getElementById('payments-table')) {
      renderPaymentsTable(payments);
    }
    
    // Recalculer les montants dus
    recalculateDuesAmount();
  });
  
  // ===== CALLBACK : Notifications =====
  onDataChange('notifications', (notifications) => {
    console.log('🔔 Notification reçue :', notifications);
    
    // Mettre à jour badge notifications
    const unreadCount = notifications.length;
    updateNotificationBadge(unreadCount);
    
    // Afficher la notification
    if (notifications.length > 0) {
      showNotificationToast(notifications[0]);
    }
  });
}

// ===== 3. FUNCTIONS DE MISE À JOUR DE L'INTERFACE =====

/**
 * Mettre à jour le tableau des commandes
 * Remplacer votre fonction existante
 */
function renderOrdersTable(orders) {
  const table = document.getElementById('orders-table');
  if (!table) return;
  
  // Trier par date décroissante
  const sorted = [...orders].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  table.innerHTML = sorted.map(order => `
    <tr>
      <td>${order.ref}</td>
      <td>${order.clientName}</td>
      <td>${order.orderTotal} F</td>
      <td>
        <span class="badge ${getStatusBadgeClass(order.status)}">
          ${order.status}
        </span>
      </td>
      <td>${new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
      <td>
        <button onclick="editOrder('${order.id}')">Éditer</button>
        <button onclick="deleteOrder('${order.id}')">Supprimer</button>
      </td>
    </tr>
  `).join('');
  
  console.log(`✅ Tableau commandes rafraîchi (${orders.length} lignes)`);
}

/**
 * Mettre à jour le tableau d'inventaire
 */
function renderInventoryTable(inventory) {
  const table = document.getElementById('stocks-table');
  if (!table) return;
  
  // inventory = { 'castel-33cl': 12, 'sprite-33cl': 45, ... }
  
  table.innerHTML = Object.entries(inventory).map(([productId, quantity]) => {
    const product = getProductById(productId);
    const status = quantity <= 12 ? 'bas' : quantity <= 25 ? 'limité' : 'ok';
    const statusClass = status === 'bas' ? 'red' : status === 'limité' ? 'orange' : 'green';
    
    return `
      <tr>
        <td>${product?.name || productId}</td>
        <td class="qty">${quantity}</td>
        <td>
          <span class="badge badge-${statusClass}">${status}
        </span>
        </td>
        <td>
          <input type="number" value="${quantity}" onchange="updateStock('${productId}', this.value)">
        </td>
      </tr>
    `;
  }).join('');
  
  console.log(`✅ Tableau stocks rafraîchi`);
}

/**
 * Mettre à jour le tableau des clients
 */
function renderClientsTable(clients) {
  const table = document.getElementById('clients-table');
  if (!table) return;
  
  table.innerHTML = clients.map(client => `
    <tr>
      <td>${client.name}</td>
      <td>${client.phone}</td>
      <td>${client.zone}</td>
      <td>
        <span class="badge ${getClientStatusClass(client.status)}">
          ${client.status}
        </span>
      </td>
      <td class="amount ${client.balanceDue > 0 ? 'red' : 'green'}">
        ${client.balanceDue} F
      </td>
      <td>
        <button onclick="editClient('${client.id}')">Éditer</button>
      </td>
    </tr>
  `).join('');
  
  console.log(`✅ Tableau clients rafraîchi (${clients.length} lignes)`);
}

/**
 * Mettre à jour le tableau des paiements
 */
function renderPaymentsTable(payments) {
  const table = document.getElementById('payments-table');
  if (!table) return;
  
  table.innerHTML = payments.map(payment => `
    <tr>
      <td>${payment.clientName}</td>
      <td>${payment.amount} F</td>
      <td>${payment.method}</td>
      <td>${new Date(payment.recordedAt).toLocaleDateString('fr-FR')}</td>
      <td>
        <button onclick="deletePayment('${payment.id}')">Annuler</button>
      </td>
    </tr>
  `).join('');
  
  console.log(`✅ Tableau paiements rafraîchi (${payments.length} lignes)`);
}

// ===== 4. FONCTIONS UTILITAIRES =====

/**
 * Mettre à jour le badge des notifications non lues
 */
function updateNotificationBadge(count) {
  const badge = document.getElementById('notification-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'block' : 'none';
  }
}

/**
 * Mettre à jour le badge des commandes en attente
 */
function updatePendingBadge(count) {
  const badge = document.getElementById('pending-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'block' : 'none';
  }
}

/**
 * Afficher une notification Toast
 */
function showNotificationToast(notification) {
  const toast = document.createElement('div');
  toast.className = 'toast notification-toast';
  toast.innerHTML = `
    <strong>${notification.title}</strong>
    <p>${notification.message}</p>
    <button onclick="this.parentElement.remove()">✕</button>
  `;
  document.body.appendChild(toast);
  
  // Retirer après 5 secondes
  setTimeout(() => toast.remove(), 5000);
}

/**
 * Afficher alerte stock bas
 */
function showLowStockAlert(products) {
  const alert = document.getElementById('low-stock-alert');
  if (!alert) return;
  
  alert.innerHTML = `
    <strong>⚠️ Stock bas !</strong>
    <p>${products.map(p => `${p.name} (${p.qty} restants)`).join(', ')}</p>
    <button onclick="this.parentElement.style.display='none'">✕</button>
  `;
  alert.style.display = 'block';
}

/**
 * Cacher alerte stock bas
 */
function hideLowStockAlert() {
  const alert = document.getElementById('low-stock-alert');
  if (alert) alert.style.display = 'none';
}

/**
 * Mettre à jour les statistiques du dashboard
 */
function updateDashboardStats(orders) {
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    paidOrders: orders.filter(o => o.paymentStatus === 'paid').length,
    creditOrders: orders.filter(o => o.paymentStatus === 'credit').length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.amountPaid || 0), 0),
    totalDue: orders.reduce((sum, o) => sum + (o.amountDue || 0), 0)
  };
  
  // Mettre à jour le DOM
  document.getElementById('total-orders').textContent = stats.totalOrders;
  document.getElementById('pending-orders').textContent = stats.pendingOrders;
  document.getElementById('total-revenue').textContent = `${stats.totalRevenue} F`;
  document.getElementById('total-due').textContent = `${stats.totalDue} F`;
}

/**
 * Recalculer les montants dus
 */
function recalculateDuesAmount() {
  const orders = getOrders();
  const totalDue = orders.reduce((sum, o) => sum + (o.amountDue || 0), 0);
  document.getElementById('total-due').textContent = `${totalDue} F`;
}

// ===== 5. DÉCONNEXION =====

/**
 * ADAPTER : fonction doLogout() dans app.js
 *
 * AVANT : await logoutUser();
 *
 * APRÈS :
 */
async function doLogoutWithRealtime() {
  console.log('👋 Déconnexion en cours...');
  
  try {
    // 1. Arrêter TOUS les listeners
    stopAllListeners();
    console.log('✅ Synchronisation temps réel arrêtée');
    
    // 2. Déconnecter l'utilisateur
    await logoutUser();
    console.log('✅ Utilisateur déconnecté');
    
    // 3. Retourner à l'écran public
    showPublicInterface();
    
  } catch (error) {
    console.error('❌ Erreur déconnexion :', error);
  }
}

// ===== 6. INITIALISATION =====

/**
 * ADAPTER : Lors du DOMContentLoaded ou du chargement de l'interface
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 DepotConnect Sénégal - Étape 4 : Synchronisation Temps Réel');
  
  // Demander la permission pour les notifications
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  
  // Les listeners seront démarrés lors du login réussi
});

// ===== 7. ADAPTER VOS FONCTIONS EXISTANTES =====

/*
REMPLACEMENTS À FAIRE DANS APP.JS :

1. Remplacer : doLogin() → doLoginWithRealtime()
   
2. Remplacer : doLogout() → doLogoutWithRealtime()

3. Remplacer les chargements statiques (getData()) par des listeners

4. Remplacer les mises à jour manuelles par les callbacks onDataChange()

5. Ajouter stopAllListeners() au beforeunload :
   window.addEventListener('beforeunload', () => {
     stopAllListeners();
   });
*/

console.log('✅ Module intégration Real-Time Sync chargé');
