// backend/controllers/buyerController.js
'use strict';

const Buyer = require('../models/Buyer');
const { computeScore } = require('../utils/scoringEngine');
const { predictChannel } = require('../services/mlService');
'use strict';
const mongoose = require('mongoose');
console.log(">>> REAL buyerController LOADED with mongoose! Path:", __filename);
console.log(">>> mongoose exists?", !!mongoose);
/**
 * Resolve the real identifier field for a buyer document.
 * CSV-imported docs use Buyer_ID (PascalCase).
 * Seed docs use buyer_id (lowercase).
 */
function resolveId(doc) {
    return doc?.Buyer_ID || doc?.buyer_id || null;
}

/**
 * GET /api/buyers/queue
 * Returns buyers NOT yet processed (status not in approved/rejected/skipped).
 */
async function getBuyerQueue(req, res) {
    try {
        const filter = {
            $or: [
                { status: { $nin: ['approved', 'rejected', 'skipped'] } },
                { status: { $exists: false } },
            ],
        };

        // 1. Try primary 'buyers' collection (via Mongoose model)
        let buyers = await Buyer.find(filter)
            .lean()
            .limit(50)
            .sort({ _id: 1 });

        let discovered_collection = 'buyers';

        // 2. 🔥 AGGRESSIVE DISCOVERY: If empty, scan OTHER collections
        if (buyers.length === 0) {
            const collections = await mongoose.connection.db.listCollections().toArray();
            for (const colInfo of collections) {
                const colName = colInfo.name;
                if (colName === 'buyers' || colName === 'system.indexes' || colName === 'users' || colName === 'chats') continue;

                const col = mongoose.connection.db.collection(colName);
                const count = await col.countDocuments(filter);
                if (count > 0) {
                    buyers = await col.find(filter).limit(50).toArray();
                    discovered_collection = colName;
                    break;
                }
            }
        }

        // Diagnostic info if STILL empty
        let debug_info = null;
        if (buyers.length === 0) {
            const collections = await mongoose.connection.db.listCollections().toArray();
            debug_info = {
                database_name: mongoose.connection.name,
                collections: collections.map(c => c.name)
            };
            const counts = {};
            for (const c of collections) {
                counts[c.name] = await mongoose.connection.db.collection(c.name).countDocuments();
            }
            debug_info.counts = counts;
        }

        return res.json({
            success: true,
            data: buyers,
            discovered_collection,
            debug_info
        });
    } catch (err) {
        console.error('[buyerController.getBuyerQueue]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

/**
 * GET /api/buyers/:buyerId
 */
async function getBuyer(req, res) {
    try {
        const { buyerId } = req.params;
        const buyer = await Buyer.findOne({
            $or: [{ Buyer_ID: buyerId }, { buyer_id: buyerId }],
        }).lean();
        if (!buyer) {
            return res.status(404).json({ success: false, message: 'Buyer not found' });
        }
        return res.json({ success: true, data: buyer });
    } catch (err) {
        console.error('[buyerController.getBuyer]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

/**
 * Helper to find and update a document in ANY collection if 'buyers' fails.
 */
async function updateBuyerStatus(buyerId, status, extraFields = {}) {
    const filter = {
        $or: [{ Buyer_ID: buyerId }, { buyer_id: buyerId }],
    };

    // 1. Try Mongoose Buyer model first
    const buyer = await Buyer.findOne(filter);
    if (buyer) {
        buyer.status = status;
        Object.assign(buyer, extraFields);
        await buyer.save();
        return buyer.toObject();
    }

    // 2. Scan OTHER collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const colInfo of collections) {
        const colName = colInfo.name;
        if (colName === 'buyers' || colName === 'system.indexes' || colName === 'users' || colName === 'chats') continue;

        const col = mongoose.connection.db.collection(colName);
        const doc = await col.findOne(filter);
        if (doc) {
            const updateDoc = {
                $set: { status, ...extraFields }
            };
            await col.updateOne({ _id: doc._id }, updateDoc);
            const updated = await col.findOne({ _id: doc._id });
            return updated;
        }
    }
    return null;
}

/**
 * POST /api/buyers/:buyerId/approve
 */
async function approveBuyer(req, res) {
    try {
        const { buyerId } = req.params;

        // We need the document for scoring/ML, so we find it first
        const filter = {
            $or: [{ Buyer_ID: buyerId }, { buyer_id: buyerId }],
        };

        let targetDoc = await Buyer.findOne(filter).lean();
        if (!targetDoc) {
            const collections = await mongoose.connection.db.listCollections().toArray();
            for (const c of collections) {
                if (['buyers', 'users', 'chats', 'system.indexes'].includes(c.name)) continue;
                targetDoc = await mongoose.connection.db.collection(c.name).findOne(filter);
                if (targetDoc) break;
            }
        }

        if (!targetDoc) {
            return res.status(404).json({ success: false, message: 'Buyer not found' });
        }

        const { score, label } = computeScore(targetDoc);
        const channel = await predictChannel(targetDoc);

        const updated = await updateBuyerStatus(buyerId, 'approved', {
            recommended_channel: channel,
            decision_score: score,
            decision_label: label
        });

        return res.json({ success: true, data: updated });
    } catch (err) {
        console.error('[buyerController.approveBuyer]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

/**
 * POST /api/buyers/:buyerId/reject
 */
async function rejectBuyer(req, res) {
    try {
        const { buyerId } = req.params;
        const updated = await updateBuyerStatus(buyerId, 'rejected');
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Buyer not found' });
        }
        return res.json({ success: true, data: updated });
    } catch (err) {
        console.error('[buyerController.rejectBuyer]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

/**
 * POST /api/buyers/:buyerId/skip
 */
async function skipBuyer(req, res) {
    try {
        const { buyerId } = req.params;
        const updated = await updateBuyerStatus(buyerId, 'skipped');
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Buyer not found' });
        }
        return res.json({ success: true, data: updated });
    } catch (err) {
        console.error('[buyerController.skipBuyer]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

/**
 * GET /api/buyers?status=approved
 */
async function getApprovedBuyers(req, res) {
    try {
        const status = req.query.status || 'approved';
        const filter = (status === 'new')
            ? { $or: [{ status: 'new' }, { status: { $exists: false } }] }
            : { status };

        // 1. Try primary 'buyers' first
        let allApproved = await Buyer.find(filter).lean();

        // 2. Scan OTHER collections for documents matching the filter
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (const colInfo of collections) {
            const colName = colInfo.name;
            if (['buyers', 'users', 'chats', 'system.indexes'].includes(colName)) continue;

            const col = mongoose.connection.db.collection(colName);
            const docs = await col.find(filter).toArray();
            if (docs.length > 0) {
                // Merge with results (avoiding duplicates if it was somehow in both)
                const existingIds = new Set(allApproved.map(a => String(a._id)));
                for (const d of docs) {
                    if (!existingIds.has(String(d._id))) {
                        allApproved.push(d);
                    }
                }
            }
        }

        // Sort by updatedAt if available
        allApproved.sort((a, b) => {
            const timeA = new Date(a.updatedAt || a._id.getTimestamp?.() || 0).getTime();
            const timeB = new Date(b.updatedAt || b._id.getTimestamp?.() || 0).getTime();
            return timeB - timeA;
        });

        return res.json({ success: true, data: allApproved });
    } catch (err) {
        console.error('[buyerController.getApprovedBuyers]', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    getBuyer,
    approveBuyer,
    rejectBuyer,
    skipBuyer,
    getApprovedBuyers,
    getBuyerQueue,
};