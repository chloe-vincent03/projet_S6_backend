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
// Récupère la liste des énigmes (avec réponse SI résolue par l'utilisateur connecté)
router.get('/', async (req, res) => {
    try {
        // 1. Fetch all enigmas (answers hidden by default)
        // We select answer specifically so we can conditionally reveal it
        const enigmas = await Enigma.find().select('+answer');

        // 2. Identify User
        const userDecoded = await getAuthUser(req);
        let unlockedFragmentIds = [];

        if (userDecoded && userDecoded.userId) {
            const user = await User.findById(userDecoded.userId);
            if (user && user.unlockedFragments) {
                unlockedFragmentIds = user.unlockedFragments.map(f => f.fragmentId);
            }
        }

        // 3. Process enigmas to hide/show answer
        const processedEnigmas = enigmas.map(enigma => {
            const enigmaObj = enigma.toObject();

            // Check if this enigma's reward fragment is in user's unlocked list
            const isSolved = unlockedFragmentIds.includes(enigma.reward.fragment_id);

            if (isSolved) {
                // Return as is (with answer)
                return enigmaObj;
            } else {
                // Remove answer property for unsolved enigmas
                delete enigmaObj.answer;
                return enigmaObj;
            }
        });

        res.json(processedEnigmas);
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
