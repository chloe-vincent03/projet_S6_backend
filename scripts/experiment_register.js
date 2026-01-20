const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Place = require('../models/Place');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const testRegistration = async () => {
    let output = '';
    const log = (msg, obj) => {
        const str = msg + (obj ? ' ' + JSON.stringify(obj) : '');
        output += str + '\n';
        console.log(str);
    };

    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is missing in .env');
        }

        await mongoose.connect(process.env.MONGO_URI);
        log('🌿 Connected to MongoDB');

        // 1. Find Place 1
        log('🔍 Finding Place 1...');
        const firstPlace = await Place.findOne({ order: 1 });
        if (!firstPlace) {
            throw new Error('Place Order 1 not found');
        }
        log('✅ Found Place: ' + firstPlace.title, firstPlace._id);

        // 2. Create Dummy User
        const dummyEmail = `test_user_${Date.now()}@test.com`;
        log('👤 Creating User: ' + dummyEmail);

        const newUser = new User({
            username: `TestUser_${Date.now()}`,
            email: dummyEmail,
            password: 'password123'
        });

        // 3. Add Progress
        newUser.progress.push({
            placeId: firstPlace._id,
            isCompleted: true
        });

        log('📋 Progress before save:', newUser.progress);

        // 4. Save
        await newUser.save();
        log('💾 User saved.');

        // 5. Fetch Back
        const savedUser = await User.findOne({ email: dummyEmail });
        log('🔍 Fetched Back User Progress:', savedUser.progress);

        if (savedUser.progress && savedUser.progress.length > 0) {
            log('🎉 SUCCESS: Progress saved!');
        } else {
            log('❌ FAILURE: Progress missing!');
        }

        // Cleanup
        await User.deleteOne({ email: dummyEmail });
        log('🧹 Cleanup done');

    } catch (error) {
        log('❌ Error: ' + error.message);
    } finally {
        fs.writeFileSync(path.join(__dirname, 'experiment_result.txt'), output);
        console.log('Written to experiment_result.txt');
        process.exit(0);
    }
};

testRegistration();
