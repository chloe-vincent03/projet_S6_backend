const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Autorise le partage de ressources
app.use(express.json()); // Permet de lire le JSON envoyé par le front


// c'est ou il y a mon frontend
app.use(express.static(path.join(__dirname, 'dist')));

// LOG GLOBAL
app.use((req, res, next) => {
  console.log(`[GLOBAL LOG] ${req.method} ${req.url}`);
  next();
});

app.use('/api/places', require('./routes/places'));
app.use('/api/user', require('./routes/user'));
app.use('/api/enigmas', require('./routes/enigmas'));

// Connexion à la base de données (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🌿 Connecté à la mémoire de la ville (MongoDB)'))
  .catch(err => console.error('Erreur de connexion :', err));


app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});