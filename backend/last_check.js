
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
    try {
        console.log('CONNECTING...');
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
        console.log('CONNECTED TO:', mongoose.connection.name);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('COLLECTIONS:', collections.map(c => c.name));

        for (const c of collections) {
            const count = await mongoose.connection.db.collection(c.name).countDocuments();
            console.log(`COLL: ${c.name} | COUNT: ${count}`);
        }

        const Buyer = require('./models/Buyer');
        const totalBuyers = await Buyer.countDocuments({});
        console.log('TOTAL BUYERS (Model):', totalBuyers);

        const sample = await Buyer.findOne({}).lean();
        console.log('SAMPLE BUYER:', JSON.stringify(sample));

    } catch (err) {
        console.log('ERROR:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('DONE');
    }
}

run();
