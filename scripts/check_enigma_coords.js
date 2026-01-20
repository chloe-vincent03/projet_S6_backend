const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Enigma = require('../models/Enigma');

dotenv.config({ path: '../.env' }); // Adjust if run from scripts folder or root

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected.');
        const enigmas = await Enigma.find({});
        console.log('--- Enigma DB Dump ---');
        enigmas.forEach(e => {
            console.log(`ID: ${e.id}`);
            console.log(`X: ${e.reward.x}, Y: ${e.reward.y}, W: ${e.reward.width}, Z: ${e.reward.zIndex}`);
        });
        mongoose.connection.close();
    })
    .catch(console.error);
