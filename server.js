const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: true, // Autorise toutes les origines de manière dynamique
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());



// LOG GLOBAL
app.use((req, res, next) => {
  console.log(`[GLOBAL LOG] ${req.method} ${req.url}`);
  next();
});

// Routes API
app.get('/', (req, res) => {
  res.send('API La Ville Lente connectée 🌿');
});
app.use('/api/places', require('./routes/places'));
app.use('/api/user', require('./routes/user'));
app.use('/api/enigmas', require('./routes/enigmas'));

// Connexion à la base de données (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🌿 Connecté à la mémoire de la ville (MongoDB)'))
  .catch(err => console.error('Erreur de connexion :', err));



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur actif sur le port ${PORT}`);
});