const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const testPersistence = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🌿 Connected to MongoDB');

        // Create dummy user
        const dummyEmail = `debug_${Date.now()}@test.com`;
        const newUser = new User({
            username: `Debug_${Date.now()}`,
            email: dummyEmail,
            password: 'password'
        });

        // Add fragment directly
        newUser.unlockedFragments.push({
            fragmentId: 'test_fragment_01'
        });

        await newUser.save();
        console.log('💾 User saved with fragment.');

        // Fetch back
        const fetchedUser = await User.findOne({ email: dummyEmail });
        console.log('🔍 Fetched user fragments:', fetchedUser.unlockedFragments);

        if (fetchedUser.unlockedFragments.length > 0 && fetchedUser.unlockedFragments[0].fragmentId === 'test_fragment_01') {
            console.log('✅ SUCCESS: User model schema accepts unlockedFragments.');
        } else {
            console.log('❌ FAILURE: unlockedFragments not saved. Schema might be outdated or incorrect.');
        }

        await User.deleteOne({ email: dummyEmail });
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

testPersistence();
