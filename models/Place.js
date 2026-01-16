const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    inkLayer: {
        type: String,
        required: true
    },
    watercolorLayer: {
        type: String,
        required: true
    },
    audio: {
        type: String
    },
    coordinates: {
        x: Number,
        y: Number
    }
});

module.exports = mongoose.model('Place', PlaceSchema);