# Guide Publication DepotConnect

Ce guide explique comment publier `DepotConnect` sur internet avec `GitHub` puis `Netlify`.

## 1. Preparer Le Dossier

Verifie que le dossier du projet contient bien :

- `index.html`
- `styles/style.css`
- `scripts/app.js`
- `manifest.webmanifest`
- `sw.js`
- `assets/`

## 2. Creer Un Depot GitHub

1. Va sur `https://github.com`
2. Connecte-toi
3. Clique sur `New repository`
4. Donne un nom, par exemple : `depotconnect`
5. Clique sur `Create repository`

## 3. Envoyer Le Projet Sur GitHub

Si `git` est installe sur ton PC, ouvre un terminal dans le dossier `boissons` puis tape :

```powershell
git init
git add .
git commit -m "DepotConnect initial"
git branch -M main
git remote add origin https://github.com/TON-NOM-UTILISATEUR/depotconnect.git
git push -u origin main
```

Remplace :

- `TON-NOM-UTILISATEUR` par ton vrai identifiant GitHub

Si Git demande ton identifiant ou un token, suis les instructions de GitHub.

## 4. Creer Un Compte Netlify

1. Va sur `https://www.netlify.com`
2. Clique sur `Sign up`
3. Choisis `Continue with GitHub`
4. Autorise Netlify a acceder a ton compte GitHub

## 5. Deployer Le Projet

1. Dans Netlify, clique sur `Add new site`
2. Clique sur `Import an existing project`
3. Choisis `GitHub`
4. Selectionne le depot `depotconnect`
5. Laisse les champs simples car le projet est statique

Configuration conseillee :

- `Branch to deploy` : `main`
- `Build command` : laisser vide
- `Publish directory` : laisser vide ou mettre `.`

6. Clique sur `Deploy site`

## 6. Recuperer Le Lien Public

Apres quelques secondes, Netlify va te donner un lien du type :

```text
https://nom-genere-par-netlify.netlify.app
```

Tu peux partager ce lien directement.

## 7. Renommer Le Lien

Si tu veux un lien plus propre :

1. Ouvre le dashboard Netlify
2. Va dans `Site configuration`
3. Va dans `Domain management`
4. Clique sur `Options`
5. Choisis `Edit site name`

Exemple :

```text
https://depotconnect-senegal.netlify.app
```

## 8. Tester La PWA En Ligne

Une fois en ligne :

1. Ouvre le lien public dans `Chrome`
2. Verifie que l’option `Installer` apparait
3. Clique sur `Installer`
4. Confirme que l’application s’ouvre comme une vraie app

## 9. Mettre A Jour L’Application

Quand tu modifies le projet :

```powershell
git add .
git commit -m "Mise a jour DepotConnect"
git push
```

Netlify redeploiera automatiquement le site.

## 10. Si Git N’Est Pas Installe

Tu peux aussi :

1. creer le depot sur GitHub
2. glisser les fichiers manuellement via l’interface GitHub
3. puis connecter ce depot a Netlify

Mais avec `git`, ce sera beaucoup plus propre et plus rapide.

## Conseil

Le chemin le plus simple pour toi :

1. GitHub
2. Netlify
3. partage du lien public
4. installation PWA depuis Chrome

## Fichier Utile

Tu peux garder ce guide dans le projet pour t’en servir plus tard :

- [GUIDE-PUBLICATION-NETLIFY.md](c:\Users\JP-JUNIOR\Desktop\boissons\GUIDE-PUBLICATION-NETLIFY.md)
