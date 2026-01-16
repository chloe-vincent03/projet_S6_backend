const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// INSCRIPTION
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// CONNEXION (Simplifiée)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    res.json({ message: "Connexion réussie !", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CONNEXION avec génération de Token
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    // GÉNÉRATION DU TOKEN
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' } // Le jeton expire après 24h
    );

    res.json({ 
      message: "Connexion réussie !", 
      token: token, // On envoie le jeton au front
      userId: user._id 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;