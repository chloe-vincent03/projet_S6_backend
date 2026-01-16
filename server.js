const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Autorise le partage de ressources
app.use(express.json()); // Permet de lire le JSON envoyé par le front

// Connexion à la base de données (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🌿 Connecté à la mémoire de la ville (MongoDB)'))
  .catch(err => console.error('Erreur de connexion :', err));

// Route de test
app.get('/', (req, res) => {
  res.send('Le serveur de la Ville Lente est en route...');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});