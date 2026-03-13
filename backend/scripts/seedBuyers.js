'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Buyer = require('../models/Buyer');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/loc_hackathon';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await Buyer.deleteMany({});

        await Buyer.insertMany([
            {
                buyer_id: 'BUY_1001',
                company_name: 'TechCorp Industries',
                country: 'UK',
                revenue_score: 78,
                Job_Promotion_Flag: 1,
                Hiring_Increase_Flag: 1,
                priority_tier: 'Warm',
                urgency_level: 'Immediate',
                Tariff_News_Impact: 0.01,
                War_News_Impact: 0.5,
                Market_News_Impact: 0.03,
                status: 'new'
            },
            {
                buyer_id: 'BUY_1002',
                company_name: 'GlobalChem Ltd',
                country: 'Germany',
                revenue_score: 65,
                Job_Promotion_Flag: 0,
                Hiring_Increase_Flag: 1,
                priority_tier: 'Hot',
                urgency_level: 'This Month',
                Tariff_News_Impact: 0.2,
                War_News_Impact: 0.1,
                Market_News_Impact: 0.4,
                status: 'new'
            }
        ]);

        console.log('🎉 Buyers seeded successfully');
        process.exit();
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
}

seed();