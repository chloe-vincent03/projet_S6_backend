const mongoose = require('mongoose');

const EnigmaSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    theme: { type: String, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    hint: { type: String },
    answer: { type: String, required: true, select: false }, // Hidden by default
    reward: {
        word: { type: String, required: true },
        fragment_id: { type: String, required: true },
        fragment_type: { type: String, required: true },
        fragment_svg_path: { type: String, required: true },
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        width: { type: Number, default: 100 },
        zIndex: { type: Number, default: 1 },
        description: { type: String }
    },
    difficulty: { type: String, enum: ['facile', 'moyen', 'difficile'], default: 'facile' }
});

module.exports = mongoose.model('Enigma', EnigmaSchema);
