
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function debugDB() {
    try {
        console.log('Connecting to:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Available Collections:', collections.map(c => c.name));

        for (const colInfo of collections) {
            const col = db.collection(colInfo.name);
            const count = await col.countDocuments();
            console.log(`Collection: ${colInfo.name} | Total Documents: ${count}`);

            const sample = await col.findOne({});
            if (sample) {
                console.log(`Sample from ${colInfo.name}:`, JSON.stringify(sample, null, 2).substring(0, 500) + '...');
            }
        }

        // Specifically check the query being used in buyerController
        const buyersCol = db.collection('buyers');
        const queueCriteria = {
            $or: [
                { status: { $nin: ['approved', 'rejected', 'skipped'] } },
                { status: { $exists: false } },
            ],
        };
        const queueCount = await buyersCol.countDocuments(queueCriteria);
        console.log('Buyers matching Queue Criteria (raw query):', queueCount);

        const allStatusValues = await buyersCol.distinct('status');
        console.log('Distinct status values in buyers collection:', allStatusValues);

        const sampleBuyer = await buyersCol.findOne({});
        console.log('Full Sample Buyer Object:', JSON.stringify(sampleBuyer, null, 2));

    } catch (err) {
        console.error('❌ Error during DB debug:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

debugDB();
