# 🚀 DepotConnect - Plateforme de Gestion de Dépôts de Boissons

## 📖 Description
**DepotConnect** est une application web moderne et responsive pour la gestion complète des dépôts de boissons au Sénégal. Conçue spécifiquement pour les propriétaires de dépôts et leurs secrétaires, elle permet de gérer stocks, commandes, factures, communications clients, et plus encore.

**Fonctionnalités clés :**
- 🏭 **Gestion multi-rôles** : Propriétaire (accès total) vs Secrétaire (accès restreint)
- 📦 **Stocks & Produits** : Suivi inventaire, alertes stock bas, mouvements entrée/sortie
- 🧾 **Commandes & Factures** : Création, suivi, génération PDF, gestion créances
- 💬 **Communications** : Messagerie clients + Forum privé propriétaires
- 📊 **Tableau de bord analytique** : CA, tendances, KPI temps réel
- 🌙 **Mode sombre/clair** : Thème persistant (localStorage)
- 📝 **Inscription multi-étapes** : Validation progressive (coordonnées → dépôt)
- 🔔 **Notifications** : Stocks, messages, impayés
- 👥 **Gestion équipe** : Comptes secrétaires avec droits granulaires

## 🛠️ Technologies
| Technologie | Version | Rôle |
|-------------|---------|------|
| **HTML5** | 5 | Structure sémantique |
| **CSS3** | 3 | Design moderne, responsive, animations CSS |
| **JavaScript** | Vanilla ES6+ | Logique métier, DOM, localStorage, sessionStorage |

**Aucune dépendance externe** - 100% Vanilla Web !

## 📁 Structure du projet
```
boissons/
├── index.html          # Page principale + modales
├── README.md           # Ce fichier
├── TODO.md             # Suivi tâches
├── depotconnect.zip    # Archive projet (backup)
├── assets/
│   └── favicon.svg     # Icône navigateur
├── scripts/
│   └── app.js          # Logique métier (700+ lignes)
└── styles/
    └── style.css       # Styles + variables CSS (dark/light)
```

## 🚀 Installation & Lancement local
1. **Ouvrir le projet** : Double-clic sur `index.html` ou via navigateur
2. **Ou via éditeur** :
   ```
   Ouvrir le dossier "boissons" dans VS Code
   Clic droit sur index.html → "Open with Live Server"
   ```
3. **Connexion prototype** :
   ```
   Admin/Propriétaire : Sélectionner "Propriétaire" → Connexion
   Secrétaire : Sélectionner "Secrétaire" → Connexion
   ```

## 🎮 Utilisation
1. **Choisir rôle** : Admin (accès total) ou Secrétaire
2. **Naviguer** : Sidebar gauche + tableau de bord adaptatif
3. **Tester fonctionnalités** :
   - Toggle 🌙 Mode sombre (persistant)
   - Créer commandes avec panier
   - Enregistrer mouvements stock
   - Messages simulés + forum privé
   - Inscription dépôt (modal multi-étapes)

## 📱 Responsive Design
- 💻 Desktop : Sidebar complète
- 📱 Mobile : Sidebar hamburger + touch-friendly

## 🔮 Roadmap
- [ ] API Backend (Node.js/Express + PostgreSQL)
- [ ] Authentification JWT
- [ ] Export PDF réel (jsPDF)
- [ ] PWA + Service Workers
- [ ] SMS via Africa's Talking API

**Auteur** : Projet maquette interactive - DepotConnect 2025  
**Licence** : MIT License

