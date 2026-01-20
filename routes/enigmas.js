const express = require('express');
const router = express.Router();
const Enigma = require('../models/Enigma');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to extract user from token (optional for viewing, required for saving)
const getAuthUser = async (req) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Contains id
    } catch (e) {
        return null;
    }
};

// GET /api/enigmas
// Récupère la liste des énigmes
router.get('/', async (req, res) => {
    try {
        const enigmas = await Enigma.find();
        // Check if user is logged in to mark solved status? 
        // For now, just return enigmas, frontend matches with user progress.
        res.json(enigmas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/enigmas/verify
// Vérifie la réponse et sauvegarde la progression si connecté
router.post('/verify', async (req, res) => {
    const { id, answer } = req.body;

    try {
        const enigma = await Enigma.findOne({ id }).select('+answer');
        if (!enigma) return res.status(404).json({ message: 'Énigme non trouvée' });
        if (!answer) return res.status(400).json({ message: 'Réponse manquante' });

        const isCorrect = enigma.answer.toLowerCase().trim() === answer.toLowerCase().trim();

        if (isCorrect) {
            // Save progress if user is authenticated
            const userDecoded = await getAuthUser(req);

            if (userDecoded && userDecoded.userId) {
                const user = await User.findById(userDecoded.userId);
                if (user) {
                    // Avoid duplicates
                    const alreadyUnlocked = user.unlockedFragments.some(f => f.fragmentId === enigma.reward.fragment_id);
                    if (!alreadyUnlocked) {
                        user.unlockedFragments.push({
                            fragmentId: enigma.reward.fragment_id
                        });
                        await user.save();
                        console.log(`[Grimoire] Progress saved for user ${user.username} (Fragment: ${enigma.reward.fragment_id})`);
                    }
                }
            }

            res.json({
                success: true,
                reward: enigma.reward
            });
        } else {
            res.json({
                success: false,
                message: 'Réponse incorrecte'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
