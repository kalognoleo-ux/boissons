# ⚡ Étape 4 : Synchronisation Temps Réel avec Firestore

## 🎯 Objectif

Remplacer les **appels statiques** (charger une fois) par une **synchronisation en temps réel** avec les listeners Firestore.

Quand un secrétaire enregistre une commande ou un paiement, le propriétaire le voit **instantanément** sur son tableau de bord ! 🚀

---

## 📋 Sommaire

1. [Concept : Listeners Firestore](#1️⃣-concept--listeners-firestore)
2. [Implémenter les listeners](#2️⃣-implémenter-les-listeners)
3. [Gérer l'état réactif](#3️⃣-gérer-létat-réactif)
4. [Mettre à jour l'interface](#4️⃣-mettre-à-jour-linterface)
5. [Gestion des événements](#5️⃣-gestion-des-événements)

---

## 1️⃣ Concept : Listeners Firestore

### AVANT (Étape 3)
```javascript
// Charger UNE FOIS au démarrage
const orders = await getDocs(collection(db, 'orders'));
console.log('Commandes :', orders);

// ❌ Les données ne se mettent à jour que si on recharge la page
```

### APRÈS (Étape 4)
```javascript
// Écouter en TEMPS RÉEL
onSnapshot(collection(db, 'orders'), (snapshot) => {
  orders = snapshot.docs.map(doc => doc.data());
  console.log('Commandes :', orders); // Mis à jour instantanément !
  updateUI();  // Rafraîchir l'interface
});

// ✅ Chaque changement est détecté automatiquement
```

### Avantages
- ✅ Synchronisation instantanée entre utilisateurs
- ✅ Pas besoin de rafraîchir/recharger
- ✅ Notifications en temps réel
- ✅ Données toujours à jour

---

## 2️⃣ Implémenter les Listeners

### Module Créé

Je vous ai créé **`scripts/firebase-realtime.js`** avec :

| Fonction | Écoute | Utilité |
|----------|--------|---------|
| `listenToProducts()` | Collection `products` | Mises à jour catalogue produits |
| `listenToInventory(depotId)` | Stocks du dépôt | Quantités disponibles en direct |
| `listenToOrders(depotId)` | Commandes du dépôt | Nouvelles commandes, mises à jour |
| `listenToClients(depotId)` | Clients du dépôt | Nouveau client, solde credit changé |
| `listenToPayments(depotId)` | Paiements du dépôt | Versements enregistrés |
| `listenToTeam(depotId)` | Équipe du dépôt | Statut online/offline des secrétaires |
| `listenToNotifications(userId)` | Notifications | Alertes stock bas, nouvelles commandes |
| `startAllListeners(depotId, userId)` | TOUS les listeners | À utiliser au démarrage |
| `stopAllListeners()` | Arrête TOUS | À utiliser à la déconnexion |

---

## 3️⃣ Gérer l'État Réactif

### État Global

```javascript
import { realtimeData, onDataChange } from './scripts/firebase-realtime.js';

// Accéder aux données
console.log(realtimeData.orders);       // Toutes les commandes
console.log(realtimeData.clients);      // Tous les clients
console.log(realtimeData.inventory);    // Les stocks par dépôt
console.log(realtimeData.notifications); // Les notifications
```

### S'inscrire à des Changements

```javascript
// Quand les commandes changent
onDataChange('orders', (orders) => {
  console.log('Commandes mises à jour :', orders);
  updateOrdersUI(orders);  // Rafraîchir l'interface
});

// Quand l'inventaire change
onDataChange('inventory', (inventory) => {
  console.log('Stocks mis à jour :', inventory);
  updateInventoryUI(inventory);
});

// Quand une notification arrive
onDataChange('notifications', (notifications) => {
  console.log('Nouvelle notification :', notifications);
  showNotificationBadge(notifications.length);
});
```

---

## 4️⃣ Mettre à Jour l'Interface

### Exemple 1 : Tableau des Commandes

```javascript
import { startAllListeners, onDataChange } from './scripts/firebase-realtime.js';

// Au chargement de l'interface privée
function loadPrivateInterface(depotId, userId) {
  console.log('🚀 Démarrage du tableau de bord');
  
  // Démarrer TOUS les listeners
  startAllListeners(depotId, userId);
  
  // S'inscrire aux changements de commandes
  onDataChange('orders', (orders) => {
    // Fonction existante de votre app.js
    refreshOrdersDisplay(orders);
  });
  
  // S'inscrire aux changements de notifications
  onDataChange('notifications', (notifications) => {
    updateNotificationBadge(notifications.length);
  });
}
```

### Exemple 2 : Indicateur Stock Bas

```javascript
onDataChange('inventory', (inventory) => {
  // inventory = { 'castel-33cl': 10, 'sprite-33cl': 45, ... }
  
  const lowStockProducts = [];
  for (const [productId, quantity] of Object.entries(inventory)) {
    if (quantity <= 12) {
      lowStockProducts.push({ id: productId, qty: quantity });
    }
  }
  
  // Afficher l'alerte
  if (lowStockProducts.length > 0) {
    showLowStockAlert(lowStockProducts);
  }
});
```

### Exemple 3 : Rafraîchir le Tableau de Bord

```javascript
onDataChange('orders', (orders) => {
  // Mettre à jour les KPIs
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.orderTotal, 0);
  
  // Mettre à jour le DOM
  document.getElementById('total-orders').textContent = totalOrders;
  document.getElementById('pending-orders').textContent = pendingOrders;
  document.getElementById('revenue').textContent = `${totalRevenue} F`;
});
```

---

## 5️⃣ Gestion des Événements

### Démarrer les Listeners

```javascript
// À l'authentification réussie ou au chargement de l'interface
import { startAllListeners } from './scripts/firebase-realtime.js';

// Quand l'utilisateur se connecte
async function onLoginSuccess(user) {
  const depotId = 'depot-la-trousse'; // À récupérer depuis Firestore
  const userId = user.uid;
  
  // Démarrer la synchronisation temps réel
  startAllListeners(depotId, userId);
  
  console.log('✅ Synchronisation temps réel activée');
}
```

### Arrêter les Listeners

```javascript
// À la déconnexion ou avant la fermeture de la page
import { stopAllListeners } from './scripts/firebase-realtime.js';

async function onLogout() {
  // Arrêter TOUS les listeners
  stopAllListeners();
  
  console.log('✅ Synchronisation temps réel arrêtée');
}

// Ou avant fermeture du navigateur
window.addEventListener('beforeunload', () => {
  stopAllListeners();
});
```

---

## 🔄 Flux Complet d'Utilisation

### 1. Démarrage de l'App

```javascript
// Au DOMContentLoaded ou après login() réussi
import { startAllListeners, onDataChange } from './scripts/firebase-realtime.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Authentifier l'utilisateur (Étape 2)
  const user = await loginUser(email, password);
  
  if (user) {
    // Charger le profil de l'utilisateur depuis Firestore
    const profile = await getUserProfile(user.uid);
    const depotId = profile.depotId;
    
    // Démarrer la synchronisation temps réel
    startAllListeners(depotId, user.uid);
    
    // Afficher l'interface
    showPrivateInterface();
  }
});
```

### 2. Updates en Temps Réel

```javascript
// Dans votre app.js existant

// Quand les commandes changent (un secrétaire en ajoute une)
onDataChange('orders', (orders) => {
  // Refresh tableau de bord
  renderOrdersTable(orders);
  
  // Mettre à jour le badge de commandes en attente
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  updatePendingBadge(pendingCount);
});

// Quand l'inventaire change (un secrétaire confirme une sortie)
onDataChange('inventory', (inventory) => {
  // Refresh tableau stocks
  renderInventoryTable(inventory);
  
  // Afficher alerte stock bas
  const lowStock = getLowStockProducts();
  showLowStockAlert(lowStock);
});

// Quand un paiement est enregistré
onDataChange('payments', (payments) => {
  // Mettre à jour les montants dus
  const totalDue = calculateTotalDue(orders);
  updateTotalDueDisplay(totalDue);
});
```

### 3. Déconnexion

```javascript
async function doLogout() {
  // Arrêter la sync temps réel
  stopAllListeners();
  
  // Déconnecter (Étape 2)
  await logoutUser();
  
  // Retourner à l'écran public
  showPublicInterface();
}
```

---

## 📊 Architecture Temps Réel

```
Utilisateur A (Propriétaire)        Utilisateur B (Secrétaire)
     ↓                                    ↓
  Affiche Dashboard               Enregistre Commande
     ↓                                    ↓
  startAllListeners()             saveOrder() → Firestore
     ↓                                    ↓
  onSnapshot('orders')    ←→     Firestore
     ↓                                    ↓
  Event: orders changé           
     ↓                                    ↓
  onDataChange('orders')
     ↓                                    ↓
  refreshUI() IMMÉDIATEMENT        (l'ordre en attente
     ↓                              n'apparaît instantanément)
  Dashboard mis à jour
```

---

## 🔐 Performance

### Optimisations Incluses

✅ **Queries filtrées** : `where('depotId', '==', depotId)` (pas tout charger)
✅ **Unsubscribe** : `stopAllListeners()` pour libérer la mémoire
✅ **Gestion des erreurs** : Try/catch dans chaque listener
✅ **Callbacks séparés** : Permet à plusieurs parties de l'UI de réagir

### Bonnes Pratiques

```javascript
// ❌ MAUVAIS : Recharger tout manuellement
setInterval(() => {
  orders = await getDocs(collection(db, 'orders'));
  updateUI();
}, 1000);

// ✅ BON : Listeners Firestore
onSnapshot(collection(db, 'orders'), (snapshot) => {
  orders = snapshot.docs.map(doc => doc.data());
  updateUI();
});
```

---

## ✅ Checklist Étape 4

- [ ] Module `firebase-realtime.js` importé
- [ ] `startAllListeners()` appelé au login
- [ ] `stopAllListeners()` appelé à la déconnexion
- [ ] Callbacks `onDataChange()` enregistrés
- [ ] Interface se rafraîchit quand données changent
- [ ] Notifications temps réel testé
- [ ] Performance vérifiée (pas de lag)

---

## 🆘 Dépannage

### Listeners ne se déclenchent pas
✅ Vérifiez que les Security Rules permettent la lecture
✅ Vérifiez la Console pour les erreurs
✅ Assurez-vous que `startAllListeners()` a été appelé

### UI ne se met pas à jour
✅ Vérifiez que `onDataChange()` callback est enregistré
✅ Vérifiez que `updateUI()` fonctionne correctement
✅ Ouvrez DevTools → Network → Firestore (vérifiez les appels)

### Trop de listeners/Mémoire
✅ Appelez `stopAllListeners()` quand l'utilisateur se déconnecte
✅ Appelez `stopAllListeners()` avant de démarrer de nouveaux listeners

---

## 🎯 Prochaine Étape

Une fois la synchronisation temps réel opérationnelle, vous passerez à l'**Étape 5 : Sécurité Firestore Rules** pour verrouiller l'accès aux données selon les rôles.

---

## 📚 Ressources

- [Firestore Real-Time Listeners](https://firebase.google.com/docs/firestore/query-data/listen)
- [Firestore Query Operations](https://firebase.google.com/docs/firestore/query-data/queries)
- [Best Practices for Real-Time Sync](https://firebase.google.com/docs/firestore/best-practices)
