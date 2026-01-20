const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Enigma = require('../models/Enigma');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const updates = {
    "enigma_001": { x: 50, y: 65, width: 200, zIndex: 1 }, // Base (Moved up from 80)
    "enigma_002": { x: 50, y: 48, width: 150, zIndex: 2 }, // Middle (Moved up from 55)
    "enigma_003": { x: 50, y: 30, width: 120, zIndex: 3 }, // Top (Moved up from 35)
    "enigma_004": { x: 50, y: 15, width: 100, zIndex: 4 }  // Spirit/Echo
};

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB. Updating coordinates...');

        for (const [id, coords] of Object.entries(updates)) {
            await Enigma.findOneAndUpdate(
                { id: id },
                {
                    $set: {
                        "reward.x": coords.x,
                        "reward.y": coords.y,
                        "reward.width": coords.width,
                        "reward.zIndex": coords.zIndex
                    }
                }
            );
            console.log(`Updated ${id}`);
        }

        console.log('Done!');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
