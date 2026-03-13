// backend/models/Buyer.js
const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema(
    {
        Buyer_ID: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        // It comes from the DB as "Buyer_ID" but the API endpoints expect "buyer_id".
        // The DB also lacks company_name. We'll leave the fields we explicitly need.
        Country: { type: String, default: '' },
        Industry: { type: String, default: '' },
        Revenue_Size_USD: { type: Number, default: 0 },
        Headcount_Size: { type: Number, default: 0 },
        Revenue_Growth_Score: { type: Number, default: 0 },

        // Flags (0 or 1)
        Job_Promotion_Flag: { type: Number, default: 0 },
        Hiring_Increase_Flag: { type: Number, default: 0 },

        // Classification
        priority_tier: { type: String, default: 'Cold' },   // Hot | Warm | Cold
        urgency_score_raw: { type: Number, default: 0 },

        // News impact scores (0–1 range typically)
        Tariff_News_Impact: { type: Number, default: 0 },
        War_News_Impact: { type: Number, default: 0 },
        Market_News_Impact: { type: Number, default: 0 },

        // Computed fields (set on approve)
        status: {
            type: String,
            enum: ['new', 'approved', 'rejected', 'skipped'],
            default: 'new',
        },
        recommended_channel: { type: String, default: null }, // email | call | linkedin
        decision_score: { type: Number, default: null },
        decision_label: { type: String, default: null },
    },
    {
        timestamps: true,
        // Allows reading from existing imported collection without strict field enforcement
        strict: false,
    }
);

module.exports = mongoose.model('Buyer', buyerSchema, 'buyers');
