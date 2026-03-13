
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function listCollections() {
    try {
        console.log('--- CONNECTING ---');
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('--- CONNECTED ---');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('COLLECTIONS:', collections.map(c => c.name).join(', '));

        for (const c of collections) {
            const count = await db.collection(c.name).countDocuments();
            console.log(`COL:${c.name}, COUNT:${count}`);
        }

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('--- DONE ---');
    }
}

listCollections();
