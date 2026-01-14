# 🏛️ La Ville Lente - Architecture Backend (Express.js)

Ce document répertorie les choix techniques, la structure des données et la logique de l'API développée pour porter l'expérience contemplative de "La Ville Lente".

---

## 📜 Concept Technique
Le backend sert de "gardien de la mémoire" de la ville. Il ne se contente pas de livrer des données, il orchestre la découverte progressive des fragments urbains au rythme du scroll de l'utilisateur.

### Stack Technique
* **Runtime :** Node.js
* **Framework :** Express.js
* **Base de données :** MongoDB (via Mongoose) ou PostgreSQL (via Sequelize)
* **Stockage Media :** Cloudinary ou local assets (pour les textures aquarelle et sons)

---

## 🗺️ Modèle de Données (MCD)

Le cœur du système repose sur l'entité `Lieu`. Chaque lieu est un "arrêt" sur le chemin vertical.



### Structure de l'objet `Lieu` :
| Champ | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Nom poétique du lieu |
| `order` | Number | Position dans le scroll vertical (1, 2, 3...) |
| `description` | Text | Fragment de récit révélé après coloriage |
| `layers` | Object | Chemins vers les calques (Ink, Watercolor, Mask) |
| `audio` | String | URL de l'ambiance sonore |
| `coordinates` | JSON | Points d'intérêt (x, y) pour les détails cliquables |

---

## 🛣️ API Endpoints

### 1. Exploration de la Ville
* **GET `/api/places`** : Récupère la liste de tous les lieux triés par ordre pour construire le chemin vertical dans Nuxt.
* **GET `/api/places/:id`** : Récupère les détails spécifiques d'un lieu (textes cachés).

### 2. Gestion de la Progression (Optionnel - Future Feature)
* **POST `/api/progress`** : Sauvegarde la progression de coloriage d'un utilisateur.
* **GET `/api/progress/:userId`** : Restaure l'état de la ville pour un utilisateur spécifique.

---

## 🎨 Logique de "Coloriage" (Backend Perspective)
Pour optimiser les performances, le backend envoie des images légères :
1. Une version **"Line Art"** (Ink) chargée au scroll.
2. Une version **"Watercolor"** (Couleur) chargée en arrière-plan et révélée par le script de coloriage (Canvas/SVG) côté Nuxt.

---

## 🛠️ Installation & Lancement

1. `cd backend`
2. `npm install`
3. `npm run dev` (Lancement du serveur sur le port 3001)