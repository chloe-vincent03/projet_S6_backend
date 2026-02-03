const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Enigma = require('../models/Enigma');

dotenv.config();

const initHints = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log("Connected to MongoDB...");

        const enigmas = await Enigma.find({});
        console.log(`Found ${enigmas.length} enigmas.`);

        for (const enigma of enigmas) {
            if (!enigma.hint) {
                enigma.hint = "Indice à venir..."; // Default value
                await enigma.save();
                console.log(`Initialized hint for enigma: ${enigma.title}`);
            } else {
                console.log(`Hint already exists for: ${enigma.title}`);
            }
        }

        console.log("✅ All enigmas checked/updated.");
        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Error initializing hints:", err);
    }
};

initHints();
