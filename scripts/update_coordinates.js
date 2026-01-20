const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Place = require('../models/Place');

// Load environment variables (adjust path to .env)
dotenv.config({ path: path.join(__dirname, '../.env') });

const COORDINATES_MAP = {
    1: { x: 980, y: 820 },  // Boulangerie
    2: { x: 1450, y: 550 }, // Passage
    3: { x: 450, y: 1150 }, // Librairie
    4: { x: 1650, y: 1250 }, // Kiosque
    5: { x: 350, y: 350 },   // Puzzle
    6: { x: 1000, y: 650 },  // Rotate
    7: { x: 1200, y: 900 },  // Glacier
    8: { x: 600, y: 500 },   // Theatre
    9: { x: 800, y: 1300 },  // Kiosque - Bottom Center
};

const updateCoordinates = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is missing in .env');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('🌿 Connected to MongoDB');

        const places = await Place.find();
        console.log(`Found ${places.length} places to process.`);

        for (const place of places) {
            const coords = COORDINATES_MAP[place.order];
            if (coords) {
                place.coordinates = coords;
                await place.save();
                console.log(`✅ Updated: ${place.title} (Order ${place.order}) -> x:${coords.x}, y:${coords.y}`);
            } else {
                console.warn(`⚠️ No coordinates found for Order ${place.order} (${place.title})`);
            }
        }

        console.log('🎉 Migration completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

updateCoordinates();
