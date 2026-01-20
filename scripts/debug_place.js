const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('../models/Place');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkPlace = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is missing in .env');
        }

        await mongoose.connect(process.env.MONGO_URI);

        let output = '';
        const log = (msg) => { output += msg + '\n'; console.log(msg); };

        log('🌿 Connected to MongoDB');

        const place = await Place.findOne({ order: 1 });

        if (place) {
            log(`FOUND_ORDER_1: ${place.title} (ID: ${place._id})`);
        } else {
            log('NOT_FOUND_ORDER_1');
        }

        const allPlaces = await Place.find({}).sort({ order: 1 });
        log('ALL_PLACES:');
        allPlaces.forEach(p => log(`[${p.order}] ${p.title} (Type of order: ${typeof p.order})`));

        fs.writeFileSync(path.join(__dirname, 'debug_result.txt'), output);
        console.log('Written to debug_result.txt');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

checkPlace();
