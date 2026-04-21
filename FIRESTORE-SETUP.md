# 📊 Étape 3 : Modélisation Firestore et Migration de Données

## 🎯 Objectif

Remplacer vos données stockées en **localStorage** (DATA_PRODUITS, COMMAND_HISTORY, CLIENTS, etc.) par une vraie base de données **Firestore** scalable et temps réel.

---

## 📋 Sommaire

1. [Créer les collections Firestore](#1️⃣-créer-les-collections-firestore)
2. [Configurer les Security Rules](#2️⃣-configurer-les-security-rules)
3. [Migrer les données](#3️⃣-migrer-les-données-de-localstorage)
4. [Tester la base de données](#4️⃣-tester-la-connexion-firestore)
5. [Mettre à jour app.js](#5️⃣-mettre-à-jour-appjs)

---

## 1️⃣ Créer les Collections Firestore

### Étape A : Accéder à Firestore Console

1. Allez à **[Firebase Console](https://console.firebase.google.com/)**
2. Sélectionnez votre projet **DepotConnect-Senegal**
3. Allez à **Build** → **Firestore Database**
4. Cliquez **"Créer une base de données"** (ou **"Créer une collection"** si elle existe)

### Étape B : Créer les collections manuellement

Créez ces collections (le nom doit être **exactement** comme ceci) :

#### 1. Collection `products`
- **Document 1** : `castel-33cl`
  ```json
  {
    "name": "Castel 33cl",
    "category": "Bière",
    "brand": "Castel · Carton 24",
    "basePrice": 4200,
    "packSize": "Carton 24",
    "archived": false,
    "createdAt": {nouveau timestamp},
    "updatedAt": {nouveau timestamp}
  }
  ```

> 💡 **Raccourci** : Vous pouvez aussi charger les documents en masse via le script de migration (voir section 3)

#### 2. Collection `inventory`
- Document : `{depotId}_{productId}`
  ```json
  {
    "depotId": "depot-la-trousse",
    "productId": "castel-33cl",
    "quantity": 12,
    "lowStockThreshold": 12,
    "limitedStockThreshold": 25,
    "lastUpdated": {timestamp},
    "lastUpdatedBy": "{ownerUID}"
  }
  ```

#### 3. Collection `orders`
- Document : `{orderId}`
  ```json
  {
    "ref": "CMD-092",
    "depotId": "depot-la-trousse",
    "clientName": "Restaurant Le Baobab",
    "clientPhone": "77 801 22 33",
    "lines": [
      {
        "productId": "castel-33cl",
        "productName": "Castel 33cl",
        "quantity": 10,
        "unitPrice": 4200,
        "totalPrice": 42000
      }
    ],
    "orderTotal": 85000,
    "amountPaid": 0,
    "amountDue": 85000,
    "status": "pending",
    "paymentStatus": "unpaid",
    "createdAt": {timestamp},
    "createdBy": "{ownerUID}"
  }
  ```

#### 4. Collection `clients`
- Document : `{clientId}`
  ```json
  {
    "depotId": "depot-la-trousse",
    "name": "Restaurant Le Baobab",
    "phone": "77 801 22 33",
    "zone": "Médina",
    "type": "restaurant",
    "balanceDue": 85000,
    "status": "active",
    "createdAt": {timestamp}
  }
  ```

#### 5. Collection `suppliers`
- Document : `{supplierId}`
  ```json
  {
    "depotId": "depot-la-trousse",
    "name": "Brasseries Dakar",
    "city": "Dakar",
    "phone": "33 825 10 10",
    "deliveryDelay": "24h",
    "status": "active"
  }
  ```

#### 6. Collection `team`
- Document : `{teamMemberId}`
  ```json
  {
    "depotId": "depot-la-trousse",
    "name": "Amadou Kane",
    "phone": "77 555 11 22",
    "role": "secrétaire",
    "status": "online",
    "isActive": true
  }
  ```

---

## 2️⃣ Configurer les Security Rules

### ⚠️ IMPORTANT : Sécurité

Vos données ne doivent être accessibles que par :
- ✅ Le propriétaire (admin) → Tous les droits
- ✅ Les secrétaires → Lecture/écriture restreinte
- ❌ Les autres → Accès refusé

### Étape A : Remplacer les Regles de Sécurité

1. Allez à **Firestore Database** → **Règles**
2. **Supprimez le contenu par défaut**
3. **Collez ceci** :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Règle par défaut : Authentification requise
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Users : Voir son propre profil
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Depots : Propriétaire a tous les droits
    match /depots/{depotId} {
      allow read, write: if request.auth.uid == resource.data.ownerId;
    }
    
    // Inventory : Propriétaire voit tout, secrétaire peut modifier
    match /inventory/{invId} {
      allow read: if true;  // Pour maintenant, accessibilité en lecture
      allow write: if true; // À améliorer plus tard
    }
    
    // Orders : Vérifier droit d'accès au dépôt
    match /orders/{orderId} {
      allow read, write: if true; // À améliorer plus tard
    }
  }
}
```

> 🔐 **Note** : Ces règles sont **permissives** pour faciliterer le développement.
> Les améliorer à l'Étape 5 quand tout fonctionne.

4. Cliquez **"Publier"**

---

## 3️⃣ Migrer les Données de localStorage

### Étape A : Préparer la migration

1. Ouvrez votre application dans le navigateur
2. Ouvrez **DevTools** (`F12`) → **Console**
3. **Vérifiez que vos données localStorage existent** :

   ```javascript
   console.log(JSON.parse(localStorage.getItem('commandHistory')));
   // ... etc
   ```

### Étape B : Lancer la migration

Dans la **Console DevTools**, collez et exécutez :

```javascript
// Importer le module de migration
import { migrateAllData } from './scripts/firebase-migration.js';

// Lancer la migration
await migrateAllData();
```

Vous devriez voir des logs comme :
```
🚀 DÉBUT DE LA MIGRATION
==================================================
📋 Données trouvées en localStorage :
   - Produits: 14
   - Commandes: 3
   - Clients: 4
   - Fournisseurs: 3
   - Équipe: 3

📦 Migration produits...
✅ 14 produits migrés vers Firestore

📊 Migration inventaire...
✅ 14 stocks migrés vers Firestore

... (etc pour chaque collection)

==================================================
✅ MIGRATION COMPLÉTÉE
```

### Étape C : Vérifier dans Firestore Console

1. Allez à **Firebase Console** → **Firestore Database**
2. Vérifiez que les collections existent :
   - ✅ `products`
   - ✅ `inventory`
   - ✅ `orders`
   - ✅ `clients`
   - ✅ `suppliers`
   - ✅ `team`
3. Ouvrez chaque collection pour voir les documents

---

## 4️⃣ Tester la Connexion Firestore

### Étape A : Test dans la Console

```javascript
// Importer les modules Firebase
import { db } from './firebase-config.js';
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

// TEST 1 : Récupérer tous les produits
const productsSnap = await getDocs(collection(db, 'products'));
console.log('Produits :', productsSnap.docs.length);
productsSnap.forEach(doc => console.log(doc.id, doc.data()));

// TEST 2 : Récupérer les commandes
const ordersSnap = await getDocs(collection(db, 'orders'));
console.log('Commandes :', ordersSnap.docs.length);

// TEST 3 : Récupérer les clients
const clientsSnap = await getDocs(collection(db, 'clients'));
console.log('Clients :', clientsSnap.docs.length);
```

Si tout fonctionne, vous devriez voir vos données.

---

## 5️⃣ Mettre à jour app.js

### ⚠️ ÉTAPE À FAIRE APRÈS LES AUTRES ÉTAPES

Vous allez maintenant adapter votre `app.js` pour charger les données depuis Firestore au lieu de localStorage.

**AVANT** (localStorage) :
```javascript
let DATA_PRODUITS = JSON.parse(localStorage.getItem('productsCatalog') || 'null') || DEFAULT_PRODUCTS;
let COMMAND_HISTORY = JSON.parse(localStorage.getItem('commandHistory') || 'null') || DEFAULT_COMMAND_HISTORY;
```

**APRÈS** (Firestore) :
```javascript
import { db } from '../firebase-config.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fonction pour charger les produits
async function loadProducts(depotId) {
  const productsSnap = await getDocs(collection(db, 'products'));
  const products = productsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return products;
}

// Fonction pour charger les commandes
async function loadOrders(depotId) {
  const ordersQuery = query(collection(db, 'orders'), where('depotId', '==', depotId));
  const ordersSnap = await getDocs(ordersQuery);
  const orders = ordersSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return orders;
}

// Au démarrage
DATA_PRODUITS = await loadProducts(DEPOT_ID);
COMMAND_HISTORY = await loadOrders(DEPOT_ID);
```

---

## 📊 Récapitulatif Firestore

### Collections créées
| Collection | Documents | Décrip |
|-----------|-----------|--------|
| `products` | productId | Catalogue des produits |
| `inventory` | `{depotId}_{productId}` | Stock en temps réel |
| `orders` | orderId | Commandes client |
| `payments` | paymentId | Paiements enregistrés |
| `clients` | clientId | Carnet d'adresses |
| `suppliers` | supplierId | Fournisseurs |
| `team` | teamMemberId | Équipe interne |
| `public_orders` | orderId | Commandes publiques |
| `forum` | topicId | Forum propriétaires |
| `notifications` | notificationId | Notifications |

### Structure hiérarchique
```
Firestore/
├── products/
│   ├── castel-33cl { ... }
│   ├── sprite-33cl { ... }
│   └── ...
├── inventory/
│   ├── depot-la-trousse_castel-33cl { qty: 12 }
│   └── ...
├── orders/
│   ├── cmd_1234567... { ref: 'CMD-092' }
│   └── ...
├── clients/
│   ├── cli-1 { name: 'Restaurant Le Baobab' }
│   └── ...
└── ... (autres collections)
```

---

## ✅ Checklist Étape 3

- [ ] Collections Firestore créées
- [ ] Security Rules configurées
- [ ] Données migrées de localStorage
- [ ] Firestore Console affiche les données
- [ ] Tests en Console réussis
- [ ] `app.js` adapté pour charger depuis Firestore
- [ ] L'interface fonctionne toujours

---

## 🔗 Ressources

- 📖 [Firestore Documentation](https://firebase.google.com/docs/firestore)
- 📖 [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- 📖 [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)

---

## 🆘 Dépannage

### Erreur : "Collection 'products' not found"
✅ Créez-la manuellement dans Firestore Console

### Erreur : "Permission denied"
✅ Vérifiez les Security Rules (Étape 2)

### Données ne s'affichent pas
✅ Vérifiez que la migration a réussi (Console logs)
✅ Vérifiez les IDs depotId/productId correspondent

---

## 🎯 Prochaine Étape

Une fois Firestore configurée, vous passerez à l'**Étape 4 : Synchronisation en Temps Réel** avec les listeners Firebase.
