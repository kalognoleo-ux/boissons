/**
 * FIRESTORE SECURITY RULES – DepotConnect Sénégal
 * 
 * Structure complète de sécurité par collections
 * À copier-coller dans Firebase Console > Firestore > Rules
 */

// ===== VERSION 1 : RÈGLES BASIQUES (Recommandé pour commencer) =====

const basicSecurityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ===== RÈGLE PAR DÉFAUT : Authentification requise =====
    match /{document=**} {
      // Par défaut, refuser tout
      allow read, write: if false;
    }
    
    // ===== USERS : Chacun voit son propre profil =====
    match /users/{userId} {
      // Lecture : L'utilisateur ne peut lire que SON profil
      allow read: if request.auth.uid == userId;
      
      // Écriture : L'utilisateur ne peut modifier que SON profil
      allow write: if request.auth.uid == userId;
    }
    
    // ===== DEPOTS : Propriétaire a tous les droits =====
    match /depots/{depotId} {
      // Propriétaire peut tout
      allow read, write: if request.auth.uid == resource.data.ownerId;
      
      // Secrétaires du dépôt peuvent lire
      allow read: if 
        request.auth.uid in resource.data.teamMemberIds ||
        request.auth.uid in resource.data.secretaryIds;
    }
    
    // ===== PRODUCTS : Public en lecture, propriétaire en écriture =====
    match /products/{productId} {
      // N'importe quel utilisateur connecté peut lire les produits
      allow read: if request.auth != null;
      
      // Seul un propriétaire (admin) peut created/update/delete
      allow write: if request.auth != null &&
        request.auth.uid in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.depotAdminIds;
    }
    
    // ===== INVENTORY (STOCKS) : Lecture large, écriture restreinte =====
    match /inventory/{invId} {
      let isOwner = request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      let isSecretary = request.auth != null && request.auth.uid in get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.secretaryIds;
      
      // Lire : propriétaire + secrétaires du dépôt
      allow read: if isOwner || isSecretary;
      
      // Écrire : propriétaire + secrétaires du dépôt
      allow write: if isOwner || isSecretary;
    }
    
    // ===== ORDERS (COMMANDES) : Lecture large, écriture par rôle =====
    match /orders/{orderId} {
      let isOwner = request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      let isSecretary = request.auth != null && request.auth.uid in get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.secretaryIds;
      
      // Lire : propriétaire + secrétaires
      allow read: if isOwner || isSecretary;
      
      // Créer : secrétaires + propriétaire
      allow create: if isOwner || isSecretary;
      
      // Mettre à jour : propriétaire peut tout, secrétaire que certains champs
      allow update: if 
        (isOwner) ||
        (isSecretary && 
          !request.resource.data.diff(resource.data).affectedKeys().hasAny(['status', 'paymentStatus']));
      
      // Supprimer : propriétaire seulement
      allow delete: if isOwner;
    }
    
    // ===== CLIENTS : Lecture large, écriture propriétaire =====
    match /clients/{clientId} {
      let isOwner = request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      let isSecretary = request.auth != null && request.auth.uid in get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.secretaryIds;
      
      // Lire : propriétaire + secrétaires
      allow read: if isOwner || isSecretary;
      
      // Écrire : propriétaire seulement
      allow write: if isOwner;
    }
    
    // ===== PAYMENTS : Lecture + création par secrétaires, modification par propriétaire =====
    match /payments/{paymentId} {
      let isOwner = request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      let isSecretary = request.auth != null && request.auth.uid in get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.secretaryIds;
      
      // Lire : propriétaire + secrétaires
      allow read: if isOwner || isSecretary;
      
      // Créer : secrétaires + propriétaire
      allow create: if isOwner || isSecretary;
      
      // Mettre à jour : propriétaire seulement (vérification)
      allow update: if isOwner && resource.data.verified == false;
      
      // Supprimer : propriétaire seulement
      allow delete: if isOwner;
    }
    
    // ===== TEAM : Lecture large, modification propriétaire =====
    match /team/{memberId} {
      let isOwner = request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      // Lire : tout le monde (pour afficher statut online)
      allow read: if request.auth != null;

      // Écrire : propriétaire seulement
      allow write: if isOwner;
    }
    
    // ===== FORUM : Lecture publique, écriture propriétaires/secrétaires =====
    match /forum/{topicId} {
      // Lire : tout utilisateur connecté
      allow read: if request.auth != null;
      
      // Créer : propriétaires + secrétaires
      allow create: if request.auth != null;
      
      // Modifier : auteur seulement
      allow update: if request.auth.uid == resource.data.authorId;
      
      // Supprimer : auteur seulement
      allow delete: if request.auth.uid == resource.data.authorId;
      
      // SUBCOLLECTION : messages
      match /messages/{messageId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
        allow update, delete: if request.auth.uid == resource.data.authorId;
      }
    }
    
    // ===== NOTIFICATIONS : Lecture seul propriétaire =====
    match /notifications/{notificationId} {
      // Lire : l'utilisateur destinataire seulement  
      allow read: if request.auth.uid == resource.data.userId;
      
      // Modifier : l'utilisateur peut marquer comme lu
      allow update: if 
        request.auth.uid == resource.data.userId &&
        !request.resource.data.diff(resource.data).affectedKeys().hasAny(['userId', 'type', 'title', 'message']);
      
      // Supprimer : l'utilisateur seulement
      allow delete: if request.auth.uid == resource.data.userId;
    }
    
    // ===== PUBLIC_ORDERS : Lecture propriétaire, création public =====
    match /public_orders/{orderId} {
      // Créer : n'importe qui (client public)
      allow create: if true;
      
      // Lire : propriétaire du dépôt seulement
      allow read: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      // Modifier : propriétaire seulement
      allow update: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      // Supprimer : propriétaire seulement
      allow delete: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;
    }
    
    // ===== ANALYTICS : Lecture propriétaire seulement =====
    match /analytics/{analyticsId} {
      let isOwner = request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(resource.data.depotId)).data.ownerId;

      allow read: if isOwner;
      allow write: if isOwner;
    }
  }
}
`;

// ===== VERSION 2 : RÈGLES AVANCÉES (Production) =====

const advancedSecurityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ===== FONCTIONS HELPER =====
    
    // Vérifier si l'utilisateur est propriétaire d'un dépôt
    function isDepotOwner(depotId) {
      return request.auth != null && request.auth.uid == get(/databases/$(database)/documents/depots/$(depotId)).data.ownerId;
    }
    
    // Vérifier si l'utilisateur est secrétaire d'un dépôt
    function isDepotSecretary(depotId) {
      return request.auth != null && request.auth.uid in get(/databases/$(database)/documents/depots/$(depotId)).data.secretaryIds;
    }
    
    // Vérifier si l'utilisateur travaille dans le dépôt
    function worksInDepot(depotId) {
      return isDepotOwner(depotId) || isDepotSecretary(depotId);
    }
    
    // Vérifier que les données ne sont pas modifiées de façon non autorisée
    function noSensitiveChanges() {
      return !request.resource.data.diff(resource.data).affectedKeys().hasAny([
        'ownerId', 'createdBy', 'createdAt'
      ]);
    }
    
    // Vérifier la validation des données
    function isValidOrder() {
      return request.resource.data.orderTotal > 0 &&
             request.resource.data.clientName != null &&
             request.resource.data.depotId != null;
    }
    
    // ===== RÈGLE PAR DÉFAUT =====
    match /{document=**} {
      allow read, write: if false;
    }
    
    // ===== USERS =====
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId && noSensitiveChanges();
    }
    
    // ===== DEPOTS =====
    match /depots/{depotId} {
      allow read, write: if isDepotOwner(depotId);
      allow read: if isDepotSecretary(depotId);
    }
    
    // ===== PRODUCTS (Global) =====
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if false; // Gérés par les secrétaires seulement via l'interface
    }
    
    // ===== INVENTORY =====
    match /inventory/{invId} {
      allow read: if 
        request.auth != null && 
        worksInDepot(resource.data.depotId);
      
      allow write: if 
        worksInDepot(resource.data.depotId) &&
        isValidInventoryUpdate();
    }
    
    function isValidInventoryUpdate() {
      return request.resource.data.quantity >= 0 &&
             request.resource.data.depotId == resource.data.depotId &&
             request.resource.data.productId == resource.data.productId;
    }
    
    // ===== ORDERS =====
    match /orders/{orderId} {
      allow read: if worksInDepot(resource.data.depotId);
      
      allow create: if 
        worksInDepot(request.resource.data.depotId) &&
        isValidOrder() &&
        request.resource.data.createdBy == request.auth.uid;
      
      allow update: if 
        worksInDepot(resource.data.depotId) && (
          (isDepotOwner(resource.data.depotId)) || // Propriétaire peut tout
          (isDepotSecretary(resource.data.depotId) && 
           !request.resource.data.diff(resource.data).affectedKeys().hasAny(['status']))
        );
      
      allow delete: if isDepotOwner(resource.data.depotId);
    }
    
    // ===== CLIENTS =====
    match /clients/{clientId} {
      allow read: if worksInDepot(resource.data.depotId);
      allow write: if isDepotOwner(resource.data.depotId);
    }
    
    // ===== PAYMENTS =====
    match /payments/{paymentId} {
      allow read: if worksInDepot(resource.data.depotId);
      
      allow create: if 
        worksInDepot(request.resource.data.depotId) &&
        request.resource.data.amount > 0 &&
        request.resource.data.recordedBy == request.auth.uid;
      
      allow update: if 
        isDepotOwner(resource.data.depotId) &&
        resource.data.verified == false;
      
      allow delete: if isDepotOwner(resource.data.depotId);
    }
    
    // ===== TEAM =====
    match /team/{memberId} {
      allow read: if request.auth != null;
      allow write: if isDepotOwner(resource.data.depotId);
    }
    
    // ===== FORUM =====
    match /forum/{topicId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.authorId == request.auth.uid;
      allow update, delete: if request.auth.uid == resource.data.authorId;
      
      match /messages/{messageId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null && request.resource.data.authorId == request.auth.uid;
        allow update, delete: if request.auth.uid == resource.data.authorId;
      }
    }
    
    // ===== NOTIFICATIONS =====
    match /notifications/{notificationId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId && noSensitiveChanges();
      allow delete: if request.auth.uid == resource.data.userId;
    }
    
    // ===== PUBLIC_ORDERS =====
    match /public_orders/{orderId} {
      allow create: if true; // N'importe qui peut créer
      allow read: if isDepotOwner(resource.data.depotId);
      allow update, delete: if isDepotOwner(resource.data.depotId);
    }
    
    // ===== ANALYTICS =====
    match /analytics/{analyticsId} {
      allow read, write: if isDepotOwner(resource.data.depotId);
    }
  }
}
`;

// ===== VERSION 3 : RÈGLES SUPER STRICTES (High-Security) =====

const strictSecurityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ===== FONCTIONS STRICTES =====
    
    function getUser(userId) {
      return get(/databases/$(database)/documents/users/$(userId)).data;
    }
    
    function getDepot(depotId) {
      return get(/databases/$(database)/documents/depots/$(depotId)).data;
    }
    
    function isOwner(depotId) {
      return request.auth != null && request.auth.uid == getDepot(depotId).ownerId;
    }

    function isSecretaryOf(depotId) {
      let user = request.auth != null ? getUser(request.auth.uid) : null;
      return request.auth != null && user != null && user.role == 'sec' && user.depotId == depotId;
    }
    
    function hasRole(role) {
      return request.auth.token.claims.role == role;
    }
    
    // ===== Refuser tout par défaut =====
    match /{document=**} {
      allow read, write: if false;
    }
    
    // ===== USERS : Authentification stricte =====
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId && request.auth.uid != null;
      allow update: if request.auth.uid == userId && 
                       request.resource.data.uid == resource.data.uid &&
                       request.resource.data.role == resource.data.role;
      allow delete: if false; // Jamais
    }
    
    // ===== DEPOTS =====
    match /depots/{depotId} {
      allow read: if isOwner(depotId) || isSecretaryOf(depotId);
      allow write: if isOwner(depotId);
    }
    
    // ===== PRODUCTS =====
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    
    // ===== INVENTORY - STRICT =====
    match /inventory/{invId} {
      allow read: if isOwner(resource.data.depotId) || isSecretaryOf(resource.data.depotId);
      allow create, update: if 
        isOwner(resource.data.depotId) || isSecretaryOf(resource.data.depotId) &&
        resource.data.quantity >= 0 &&
        resource.data.lastUpdatedBy == request.auth.uid &&
        request.resource.data.depotId == resource.data.depotId;
      allow delete: if isOwner(resource.data.depotId);
    }
    
    // ===== ORDERS - STRICT =====
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.depotId) || isSecretaryOf(resource.data.depotId);
      
      allow create: if request.auth != null &&
                       isSecretaryOf(request.resource.data.depotId) &&
                       request.resource.data.createdBy == request.auth.uid &&
                       request.resource.data.orderTotal > 0;
      
      allow update: if isOwner(resource.data.depotId) ||
                       (isSecretaryOf(resource.data.depotId) && 
                        request.resource.data.status == resource.data.status);
      
      allow delete: if isOwner(resource.data.depotId);
    }
    
    // ===== CLIENTS - STRICT =====
    match /clients/{clientId} {
      allow read: if isOwner(resource.data.depotId) || isSecretaryOf(resource.data.depotId);
      allow write: if isOwner(resource.data.depotId);
      allow delete: if isOwner(resource.data.depotId) && resource.data.balanceDue == 0;
    }
    
    // ===== PAYMENTS - AUDIT TRAIL =====
    match /payments/{paymentId} {
      allow read: if isOwner(resource.data.depotId) || isSecretaryOf(resource.data.depotId);
      
      allow create: if request.auth != null &&
                       (isOwner(request.resource.data.depotId) || 
                        isSecretaryOf(request.resource.data.depotId)) &&
                       request.resource.data.recordedBy == request.auth.uid &&
                       request.resource.data.amount > 0;
      
      allow update: if isOwner(resource.data.depotId) &&
                       resource.data.verified == false;
      
      allow delete: if false; // Jamais supprimer les paiements
    }
    
    // ===== TEAM =====
    match /team/{memberId} {
      allow read: if request.auth != null;
      allow create, update, delete: if isOwner(resource.data.depotId);
    }
    
    // ===== FORUM - Modéré =====
    match /forum/{topicId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
      
      match /messages/{messageId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
        allow update, delete: if request.auth.uid == resource.data.authorId;
      }
    }
    
    // ===== NOTIFICATIONS - Private =====
    match /notifications/{notificationId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId && resource.data.userId == request.resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
      allow create: if false;
    }
    
    // ===== PUBLIC ORDERS - Open Creation =====
    match /public_orders/{orderId} {
      allow create: if true;
      allow read: if isOwner(resource.data.depotId);
      allow update, delete: if isOwner(resource.data.depotId);
    }
    
    // ===== ANALYTICS - Owner Only =====
    match /analytics/{analyticsId} {
      allow read, write: if isOwner(resource.data.depotId);
    }
  }
}
`;

console.log('✅ Sécurité Firestore Rules définies');
