const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Place = require('../models/Place');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// INSCRIPTION
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);

    // Auto-discover the first place (Order 1 - Boulangerie)
    const firstPlace = await Place.findOne({ order: 1 });
    if (firstPlace) {
      newUser.progress.push({
        placeId: firstPlace._id,
        isCompleted: true
      });
    }

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    res.status(400).json({ message: err.message });
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

    // Cookie pour le stockage sécurisé
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // true requis pour HTTPS (Vercel/Render)
      sameSite: 'none', // requis pour cross-domain
      maxAge: 24 * 60 * 60 * 1000 // 24h
    });

    res.json({
      message: "Connexion réussie !",
      token: token, // On envoie aussi le jeton au front au cas où
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PROFIL UTILISATEUR (Récupérer infos + progression)
router.get('/profile', auth, async (req, res) => {
  try {
    console.log(`[GET /profile] Request received for userId: ${req.auth.userId}`);
    const user = await User.findById(req.auth.userId).select('-password');

    if (!user) {
      console.log('[GET /profile] User not found');
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    console.log('[GET /profile] User found, returning data');
    res.json(user);
  } catch (err) {
    console.error('[GET /profile] ERROR:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

// SAUVEGARDER PROGRESSION (Débloquer un lieu)
router.post('/progress', auth, async (req, res) => {
  try {
    const { placeId } = req.body;

    // Vérifier si l'utilisateur a déjà ce lieu
    const user = await User.findById(req.auth.userId);
    const alreadyUnlocked = user.progress.some(p => p.placeId.toString() === placeId);

    if (!alreadyUnlocked) {
      user.progress.push({ placeId: placeId, isCompleted: true });
      await user.save();
    }

    res.json({ message: "Lieu débloqué !", progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;