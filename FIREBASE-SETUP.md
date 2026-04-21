# 🚀 Guide Complet - Intégration Firebase (Étape 1)

## 📋 Sommaire
1. [Créer le projet Firebase](#créer-le-projet-firebase)
2. [Configurer l'authentification](#configurer-lauthentification)
3. [Récupérer les identifiants](#récupérer-les-identifiants)
4. [Configurer votre code local](#configurer-votre-code-local)
5. [Tester la connexion](#tester-la-connexion)

---

## 1️⃣ Créer le projet Firebase

### Étape A : Accéder à la Firebase Console

1. Allez sur **[https://console.firebase.google.com/](https://console.firebase.google.com/)**
2. Connectez-vous avec votre compte Google (créez-en un si nécessaire)
3. Cliquez sur **"Créer un projet"** ou **"Ajouter un projet"**

### Étape B : Remplir les détails du projet

- **Nom du projet** : `DepotConnect-Senegal` (ou votre choix)
- **Acceptez les conditions** Google Cloud
- **Désactiver Google Analytics** (optionnel, vous pouvez l'activer plus tard)
- Cliquez **"Créer le projet"** et attendez 30 secondes

![Firebase Create Project](https://firebase.google.com/_img/get-started/create-project.png)

---

## 2️⃣ Configurer l'authentification Firebase

### Étape A : Activer l'authentification Email/Mot de passe

1. Dans votre projet Firebase, allez à **"Build"** → **"Authentication"**
2. Cliquez sur **"Commencer"**
3. Sélectionnez **"Email/Mot de passe"**
4. **Activez-la** (le bouton bleu en haut à droite)
5. Cliquez **"Sauvegarder"**

![Authentication Setup](https://firebase.google.com/_img/get-started/auth-email.png)

### Étape B : Ajouter des utilisateurs de test (Optionnel pour démonstration)

1. Allez à **"Users"** (dans l'onglet Authentication)
2. Cliquez **"Ajouter un utilisateur"**
3. Créez les comptes de test :
   - **Email** : `joel.mendy@latrousse.sn` | **Mot de passe** : `Depot2026!`
   - **Email** : `amadou.kane@latrousse.sn` | **Mot de passe** : `Depot2026!`

> ⚠️ Ces comptes sont **uniquement pour la démo**. Les vrais utilisateurs s'inscriront via votre formulaire d'inscription.

---

## 3️⃣ Récupérer les identifiants Firebase

### Étape A : Accéder aux paramètres du projet

1. Cliquez sur **⚙️ (Paramètres du projet)** en haut à gauche
2. Allez à l'onglet **"Général"**

### Étape B : Récupérer les identifiants Web

1. Sous **"Vos applications"**, cliquez sur l'icône **"</>"** (Web)
   - Si pas d'application web existante, cliquez **"Ajouter une application"** et choisissez **"Web"**

2. En bas du formulaire, copiez le bloc de configuration JavaScript :
```javascript
const firebaseConfig = {
  apiKey: "copy-your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};
```

### Étape C : Sauvegarder les identifiants

Ouvrez le fichier `firebase-config.js` dans votre projet et :

1. **Remplacez les valeurs fictives** par celles de votre Firebase

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDFkLxxxxxxxxxxxxxxxxxx",  // ← Collez ici
  authDomain: "depot-connect-abc123.firebaseapp.com",  // ← Collez ici
  projectId: "depot-connect-abc123",  // ← Collez ici
  // ... etc
};
```

---

## 4️⃣ Configurer votre code local

### Étape A : Créer le fichier `.env`

1. À la racine du projet, créez un fichier `.env` (fichier caché)
2. Copiez le contenu de `.env.example` :
```
FIREBASE_API_KEY=AIzaSyDFkLxxxxxxxxxxxxxxxxxx
FIREBASE_AUTH_DOMAIN=depot-connect-abc123.firebaseapp.com
FIREBASE_PROJECT_ID=depot-connect-abc123
FIREBASE_STORAGE_BUCKET=depot-connect-abc123.appspot.com
FIREBASE_MESSAGING_SENDER_ID=1234567890
FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890
```

> ⚠️ **Sécurité** : Ne commitez **JAMAIS** le fichier `.env` sur Git ! Il est déjà dans `.gitignore`.

### Étape B : Vérifier la structure du projet

Votre dossier `boissons/` doit contenir :

```
boissons/
├── index.html                    ✅ Modifié pour charger Firebase
├── firebase-config.js            ✅ Configuration Firebase
├── .env                          ✅ Créez ce fichier avec vos clés
├── .env.example                  ✅ Exemple (ne pas modifier)
├── .gitignore                    ✅ Exclut les fichiers sensibles
└── scripts/
    ├── app.js                    ✅ À mettre à jour (Étape 2)
    ├── firebase-auth.js          ✅ Authentification Firebase
    └── firebase-db.js            ✅ Base de données Firestore
```

---

## 5️⃣ Tester la connexion

### Étape A : Vérifier les logs du navigateur

1. Ouvrez votre site dans le navigateur : `file:///c:/Users/JP-JUNIOR/Desktop/boissons/index.html`
   
   > ℹ️ **Meilleur option** : Utilisez un serveur local pour éviter les problèmes CORS
   > ```bash
   > # Avec Python
   > python -m http.server 8000
   > 
   > # Avec Node.js
   > npx http-server
   > ```
   > Puis accédez à `http://localhost:8000`

2. Ouvrez la **Console DevTools** (`F12` → onglet **"Console"**)
3. Cherchez les messages :
   - ✅ `✅ Firebase SDK initialisé avec succès`
   - ✅ `✅ Module Firestore chargé`

### Étape B : Tester l'authentification

Dans la Console :
```javascript
// Importer la fonction de connexion
import { loginUser } from './scripts/firebase-auth.js';

// Tester une connexion
await loginUser('joel.mendy@latrousse.sn', 'Depot2026!');
// Vous devriez voir : ✅ Connexion réussie : joel.mendy@latrousse.sn
```

### Étape C : Vérifier dans Firebase Console

1. Allez à **Firebase Console** → **Authentication** → **Users**
2. Vous devriez voir vos utilisateurs testés

---

## 📝 Prochaines étapes

Une fois cette Étape 1 complétée, passez à l'**Étape 2 : Authentification complète**

### ✅ Checklist Étape 1
- [ ] Projet Firebase créé
- [ ] Authentication Email/Mot de passe activée
- [ ] Fichier `firebase-config.js` rempli avec les bonnes clés
- [ ] Fichier `.env` créé (optionnel mais recommandé)
- [ ] `index.html` modifié pour charger Firebase
- [ ] Fichiers `firebase-auth.js` et `firebase-db.js` créés
- [ ] Console montre les messages ✅
- [ ] Authentification testée en Console

---

## 🆘 En cas de problème

### Erreur : "Cannot find module 'firebase-config.js'"
✅ **Solution** : Assurez-vous que le fichier est à la **racine** du projet, pas dans `scripts/`

### Erreur : "API key not valid"
✅ **Solution** : Vérifiez que vous avez copié la **bonne clé API** depuis Firebase Console

### Module Firestore ne charge pas
✅ **Solution** : Vérifiez que le CDN Firebase n'est pas bloqué (vérifiez les Network Tabs en DevTools F12)

### Pour en savoir plus
- 📖 [Documentation Firebase Web](https://firebase.google.com/docs/web/setup)
- 📖 [Firebase Authentication](https://firebase.google.com/docs/auth)
- 📖 [Cloud Firestore](https://firebase.google.com/docs/firestore)

---

## 🎯 Résumé pour cette étape

✨ **Vous avez réalisé** :
1. ✅ Créé un projet Firebase en ligne
2. ✅ Activé Firebase Authentication
3. ✅ Créé `firebase-config.js` avec vos identifiants
4. ✅ Modifié `index.html` pour charger les SDK Firebase
5. ✅ Créé les modules `firebase-auth.js` et `firebase-db.js`

🚀 **La configuration Firebase est prête pour la suite !**
