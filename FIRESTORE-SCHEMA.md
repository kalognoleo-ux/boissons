/**
 * FIRESTORE DATABASE SCHEMA – DepotConnect Sénégal
 * 
 * Structure complète des collections et documents
 * À implémenter dans Firestore Console ou via code
 */

// ===== COLLECTIONS ET STRUCTURE =====

/**
 * COLLECTION: users
 * Stocke les profils utilisateurs et leur rôle
 */
const usersCollection = {
  // Document: {userUID}
  ['{userUID}']: {
    uid: 'string',                    // Firebase Auth UID
    email: 'string',                  // joel.mendy@latrousse.sn
    firstName: 'string',              // Joel
    lastName: 'string',               // Mendy
    phone: 'string',                  // 77 435 16 95
    role: 'enum',                     // 'admin' | 'sec' | 'owner'
    depotId: 'string',                // Référence au dépôt principal (null si client public)
    status: 'enum',                   // 'active' | 'inactive' | 'suspended'
    createdAt: 'timestamp',           // Timestamp.now()
    lastLogin: 'timestamp',           // Dernière connexion
    profileImage: 'string (optionnel)', // URL image profil
    active: 'boolean'
  }
};

/**
 * COLLECTION: depots
 * Informations des dépôts de boissons
 */
const depotsCollection = {
  // Document: {depotId}
  ['{depotId}']: {
    ownerId: 'string',                // UID du propriétaire (ref users)
    name: 'string',                   // La trousse
    region: 'string',                 // Dakar, Thiès, etc.
    commune: 'string',                // Médina, Pikine
    address: 'string',                // Rue et numéro
    phone: 'string',                  // 77 435 16 95
    ninea: 'string (optionnel)',      // Numéro NINEA
    icon: 'string',                   // 🏭 (emoji)
    
    // STATISTIQUES
    operatingHours: {
      open: 'string',                 // HH:MM (8:00)
      close: 'string'                 // HH:MM (17:00)
    },
    
    // PRODUITS SPÉCIFIQUES
    products: [
      {
        productId: 'string',          // Référence à la collection products
        name: 'string',               // Castel 33cl
        stockVisible: 'boolean'       // Visible dans l'annuaire ?
      }
    ],
    
    // STATUT
    verified: 'boolean',              // Vérifié par admin ?
    active: 'boolean',
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    
    // CONTACTS
    contactPerson: 'string',          // Joel Mendy
    contactEmail: 'string'            // joel.mendy@latrousse.sn
  }
};

/**
 * COLLECTION: products
 * Catalogue global de produits
 */
const productsCollection = {
  // Document: {productId}
  ['{productId}']: {
    name: 'string',                   // Castel 33cl
    category: 'string',               // Bière | Soda | Eau | Jus | Vin
    brand: 'string',                  // Castel · Carton 24
    basePrice: 'number',              // 4200 (en FCFA)
    packSize: 'string',               // Carton 24, Pack 6, etc.
    description: 'string (optionnel)',
    
    // GESTION
    archived: 'boolean',              // Produit retiré du catalogue ?
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  }
};

/**
 * COLLECTION: inventory
 * Stock en temps réel par dépôt
 */
const inventoryCollection = {
  // Document: {depotId}/{productId}
  ['{depotId}/{productId}']: {
    depotId: 'string',                // Référence au dépôt
    productId: 'string',              // Référence au produit
    quantity: 'number',               // 12 (cartons/unités)
    lastUpdated: 'timestamp',
    lastUpdatedBy: 'string',          // UID de l'utilisateur
    
    // SEUILS D'ALERTE
    lowStockThreshold: 'number',      // 12 (alerte = rouge)
    limitedStockThreshold: 'number',  // 25 (alerte = jaune)
    
    // HISTORIQUE (optionnel)
    movementHistory: [
      {
        type: 'enum',                 // 'in' (entrée) | 'out' (sortie)
        quantity: 'number',
        reason: 'string',             // Commande fournisseur, vente, etc.
        timestamp: 'timestamp'
      }
    ]
  }
};

/**
 * COLLECTION: orders
 * Commandes passées aux clients (internes ou externes)
 */
const ordersCollection = {
  // Document: {orderId}
  ['{orderId}']: {
    ref: 'string',                    // CMD-092 (numéro visible)
    depotId: 'string',                // Référence au dépôt
    clientId: 'string (optional)',    // Référence au client (si connu)
    clientName: 'string',             // Restaurant Le Baobab
    clientPhone: 'string',            // 77 801 22 33
    
    // DÉTAILS COMMANDE
    lines: [
      {
        productId: 'string',          // Référence au produit
        productName: 'string',        // Castel 33cl
        quantity: 'number',           // 10
        unitPrice: 'number',          // 4200
        totalPrice: 'number'          // 42000
      }
    ],
    
    // MONTANTS
    orderTotal: 'number',             // Montant HT
    amountPaid: 'number',             // Déjà payé
    amountDue: 'number',              // Reste à payer
    previousBalance: 'number',        // Crédits antérieurs
    totalDueWithPrevious: 'number',   // Montant total dû
    
    // STATUT
    status: 'enum',                   // 'pending' | 'confirmed' | 'delivered' | 'cancelled'
    paymentStatus: 'enum',            // 'unpaid' | 'partial' | 'paid' | 'credit'
    deliveryStatus: 'enum',           // 'pending' | 'in_transit' | 'delivered'
    
    // TIMELINE
    createdAt: 'timestamp',
    confirmedAt: 'timestamp (optional)',
    deliveredAt: 'timestamp (optional)',
    paidAt: 'timestamp (optional)',
    timeline: [
      {
        event: 'string',              // 'created', 'confirmed', 'paid'
        timestamp: 'timestamp',
        by: 'string'                  // UID utilisateur
      }
    ],
    
    // TRAÇABILITÉ
    createdBy: 'string',              // UID du secrétaire
    lastModifiedBy: 'string',
    updatedAt: 'timestamp',
    
    // NOTES
    notes: 'string (optional)'        // Remarques supplémentaires
  }
};

/**
 * COLLECTION: payments
 * Transactions de paiement
 */
const paymentsCollection = {
  // Document: {paymentId}
  ['{paymentId}']: {
    orderId: 'string',                // Référence à la commande
    depotId: 'string',
    clientId: 'string (optional)',
    clientName: 'string',
    
    amount: 'number',                 // Montant payé
    method: 'string',                 // 'cash' | 'check' | 'transfer' | 'mobile_money'
    reference: 'string (optional)',   // Numéro de chèque, reference virement
    
    recordedBy: 'string',             // UID du secrétaire
    recordedAt: 'timestamp',
    
    // POUR CONCILIATION
    notes: 'string (optional)',
    verified: 'boolean'               // Vérifié par propriétaire ?
  }
};

/**
 * COLLECTION: clients
 * Carnet d'adresses client
 */
const clientsCollection = {
  // Document: {clientId}
  ['{clientId}']: {
    depotId: 'string',                // Propriétaire du dépôt
    name: 'string',                   // Restaurant Le Baobab
    phone: 'string',                  // 77 801 22 33
    zone: 'string',                   // Médina
    type: 'enum',                     // 'restaurant' | 'bar' | 'épicerie' | 'supermarché' | 'autre'
    
    // CRÉDIT
    balanceDue: 'number',             // Solde actuel à payer
    creditLimit: 'number (optional)', // Crédit max autorisé
    
    // STATUT
    status: 'enum',                   // 'active' | 'inactive' | 'credit_stopped' | 'vip'
    
    // CONTACT
    contactPerson: 'string (optional)',
    email: 'string (optional)',
    address: 'string (optional)',
    notes: 'string (optional)',
    
    // SUIVI
    createdAt: 'timestamp',
    lastOrderDate: 'timestamp (optional)',
    updatedAt: 'timestamp'
  }
};

/**
 * COLLECTION: public_orders
 * Commandes passées par les clients via l'annuaire public
 */
const publicOrdersCollection = {
  // Document: {publicOrderId}
  ['{publicOrderId}']: {
    depotId: 'string',                // Quel dépôt ?
    clientName: 'string',             // Nom du client
    clientPhone: 'string',            // Téléphone
    
    products: 'string',               // Description texte des produits
    message: 'string (optional)',     // Message supplémentaire
    
    status: 'enum',                   // 'new' | 'contacted' | 'completed' | 'rejected'
    unread: 'boolean',                // Pas encore vu ?
    
    createdAt: 'timestamp',
    respondedAt: 'timestamp (optional)',
    respondedBy: 'string (optional)'  // UID du secrétaire
  }
};

/**
 * COLLECTION: suppliers
 * Fournisseurs de produits
 */
const suppliersCollection = {
  // Document: {supplierId}
  ['{supplierId}']: {
    depotId: 'string',                // Propriétaire du dépôt
    name: 'string',                   // Brasseries Dakar
    city: 'string',                   // Dakar
    phone: 'string',
    email: 'string (optional)',
    
    // DÉLAI
    deliveryDelay: 'string',          // 24h, 48h
    minOrderAmount: 'number (optional)',
    
    // PRODUITS FOURNIS
    products: [
      {
        productId: 'string',
        productName: 'string'
      }
    ],
    
    status: 'enum',                   // 'active' | 'inactive' | 'priority'
    createdAt: 'timestamp'
  }
};

/**
 * COLLECTION: team
 * Équipe interne du dépôt
 */
const teamCollection = {
  // Document: {teamMemberId}
  ['{teamMemberId}']: {
    depotId: 'string',                // Quel dépôt ?
    userId: 'string',                 // Référence à users collection
    name: 'string',                   // Amadou Kane
    phone: 'string',
    role: 'enum',                     // 'secrétaire' | 'livreur' | 'aide_stock' | 'gérant'
    
    // HORAIRE
    shift: {
      startTime: 'string',            // 08:00
      endTime: 'string',              // 17:00
      days: ['lundi', 'mardi', ...]   // Les jours travaillés
    },
    
    status: 'enum',                   // 'online' | 'offline' | 'on_break'
    isActive: 'boolean',
    
    createdAt: 'timestamp',
    joinedAt: 'timestamp'
  }
};

/**
 * COLLECTION: forum
 * Forum propriétaires (global, pas par dépôt)
 */
const forumCollection = {
  // SUBCOLLECTION: topics dans {depotId}
  // Document: {topicId}
  ['{topicId}']: {
    title: 'string',                  // Comment réduire les ruptures ?
    category: 'string',               // Stocks | Équipe | Clients | Technique
    description: 'string (optional)',
    
    authorId: 'string',               // UID du créateur
    authorDepot: 'string',            // Nom du dépôt
    
    pinned: 'boolean',                // En haut ?
    closed: 'boolean',                // Fermé ?
    
    createdAt: 'timestamp',
    updatedAt: 'timestamp (optional)',
    lastMessageAt: 'timestamp',
    
    // SUBCOLLECTION: messages
    // Document: {messageId}
    messages: {
      ['{messageId}']: {
        authorId: 'string',           // UID
        authorName: 'string',         // Joel Mendy
        authorDepot: 'string',        // La trousse
        
        text: 'string',
        createdAt: 'timestamp',
        
        // INTERACTIONS
        reactions: {
          '👍': 'number',
          '❤️': 'number'
        }
      }
    }
  }
};

/**
 * COLLECTION: notifications
 * Notifications utilisateur en temps réel
 */
const notificationsCollection = {
  // Document: {notificationId}
  ['{notificationId}']: {
    userId: 'string',                 // UID destinataire
    depotId: 'string',                // Quel dépôt ?
    
    type: 'enum',                     // 'order_placed' | 'payment_received' | 'low_stock' | 'team_message'
    title: 'string',                  // Nouvelle commande
    message: 'string',                // Restaurant Le Baobab a commandé...
    
    relatedId: 'string (optional)',   // ID de la commande, du produit, etc.
    link: 'string (optional)',        // URL pour naviguer
    
    read: 'boolean',
    createdAt: 'timestamp'
  }
};

/**
 * COLLECTION: analytics
 * Statistiques et KPIs
 */
const analyticsCollection = {
  // Document: {depotId}/{yearMonth} (ex: "depot1/2026-03")
  ['{depotId}/{yearMonth}']: {
    period: 'string',                 // 2026-03
    depotId: 'string',
    
    // VENTES
    totalOrders: 'number',
    totalRevenue: 'number',
    totalPaidAmount: 'number',
    totalCredit: 'number',
    averageOrderValue: 'number',
    
    // CLIENTS
    activeClients: 'number',
    newClients: 'number',
    clientsInCredit: 'number',
    
    // PRODUITS
    topProducts: [
      {
        productId: 'string',
        productName: 'string',
        quantitySold: 'number',
        revenue: 'number'
      }
    ],
    
    lowStockAlerts: 'number',
    
    // TOP CLIENTS
    topClients: [
      {
        clientId: 'string',
        clientName: 'string',
        orderCount: 'number',
        totalSpent: 'number'
      }
    ],
    
    computedAt: 'timestamp'
  }
};

// ===== SÉCURITÉ (SECURITY RULES) =====
// À implémenter dans Firestore Console > Rules

const securityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
    // RÈGLE GLOBALE : Authentification requise
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // USERS : Voir son propre profil
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // DEPOTS : Propriétaire peut tout, secrétaire lecture
    match /depots/{depotId} {
      // Propriétaire (admin) a tous les droits
      allow read, write: if 
        request.auth.uid == resource.data.ownerId;
      
      // Secrétaire peut lire
      allow read: if
        request.auth.uid in
          getDepotTeam(depotId);
    }
    
    // INVENTORY : Secrétaire peut modifier, propriétaire voit tout
    match /inventory/{document=**} {
      allow read: if checkDepotAccess(document.depotId);
      allow write: if 
        request.auth.uid in getDepotTeamSecretaries(document.depotId);
    }
    
    // ORDERS : Admin voit tout, secrétaire peut créer/modifier
    match /orders/{orderId} {
      allow read: if checkDepotAccess(resource.data.depotId);
      allow create, update: if
        request.auth.uid in getDepotTeam(resource.data.depotId);
      allow delete: if
        request.auth.uid == resource.data.depotId.owner;
    }
    
    // FORUM : Public pour lecture, secrétaires + propriétaires pour écrire
    match /forum/{topicId} {
      allow read, write: if request.auth != null;
      match /messages/{messageId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
        allow update, delete: if
          request.auth.uid == resource.data.authorId;
      }
    }
    
    // NOTIFICATIONS : Voir ses propres notifications
    match /notifications/{notificationId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
}
`;

// ===== HELPER FUNCTIONS POUR SÉCURITÉ =====

function checkDepotAccess(depotId) {
  // L'utilisateur travaille dans ce dépôt
  return (
    request.auth.uid == getDepotOwner(depotId) ||
    request.auth.uid in getDepotTeam(depotId)
  );
}

function getDepotOwner(depotId) {
  return get(/databases/$(database)/documents/depots/$(depotId)).data.ownerId;
}

function getDepotTeam(depotId) {
  return get(/databases/$(database)/documents/depots/$(depotId)).data.teamMemberIds || [];
}

function getDepotTeamSecretaries(depotId) {
  // Secrétaires seulement
  return get(/databases/$(database)/documents/depots/$(depotId)).data.secretaryIds || [];
}

console.log('✅ Firestore Schema défini');
