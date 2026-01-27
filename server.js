const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// 1. Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// LOG GLOBAL
app.use((req, res, next) => {
  console.log(`[GLOBAL LOG] ${req.method} ${req.url}`);
  next();
});

// Routes API
app.use('/api/places', require('./routes/places'));
app.use('/api/user', require('./routes/user'));
app.use('/api/enigmas', require('./routes/enigmas'));

// Connexion à la base de données (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🌿 Connecté à la mémoire de la ville (MongoDB)'))
  .catch(err => console.error('Erreur de connexion :', err));

// 2. CORRECTION : Utilisation d'un middleware au lieu d'une RegExp complexe
// Cela évite l'erreur "PathError" sur Node v24
app.use((req, res, next) => {
  // Si la requête commence par /api, on laisse passer aux routes API (404 si non trouvée)
  if (req.url.startsWith('/api')) {
    return next();
  }

  // Sinon, on tente d'envoyer l'index.html de Nuxt
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Si le fichier n'existe pas encore (ton cas actuel), on affiche un message propre
      // Cela évite que le serveur ne crashe avec une erreur ENOENT
      res.status(200).send("Le serveur est prêt, mais l'interface Nuxt (index.html) est manquante dans le dossier public.");
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur actif sur le port ${PORT}`);
});