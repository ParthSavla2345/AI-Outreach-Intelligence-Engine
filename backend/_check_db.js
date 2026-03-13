const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(async () => {
    console.log('Connected to DB:', mongoose.connection.db.databaseName);

    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    const Buyer = require('./models/Buyer');

    // Count total buyers
    const total = await Buyer.countDocuments();
    console.log('Total buyers in collection:', total);

    // Count "new" or missing status
    const queueCount = await Buyer.countDocuments({
        $or: [
            { status: 'new' },
            { status: { $exists: false } }
        ]
    });
    console.log('Buyers matching queue criteria:', queueCount);

    // Sample one document to see what's actually there
    const sample = await Buyer.findOne();
    console.log('Sample document keys:', sample ? Object.keys(sample.toObject()) : 'None');
    console.log('Sample document status value:', sample ? sample.status : 'N/A');

    mongoose.disconnect();
}).catch(err => {
    console.error(err);
});
