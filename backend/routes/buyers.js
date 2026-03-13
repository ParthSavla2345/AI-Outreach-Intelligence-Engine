// backend/routes/buyers.js
'use strict';

const express = require('express');
const router = express.Router();
const {
    getBuyer,
    approveBuyer,
    rejectBuyer,
    skipBuyer,
    getApprovedBuyers,
    getBuyerQueue,
} = require('../controllers/buyerController');

/**
 * GET  /api/buyers/queue          → pending review queue
 * GET  /api/buyers?status=X       → filter by status (default: approved)
 * GET  /api/buyers/:buyerId       → single buyer
 * POST /api/buyers/:buyerId/approve
 * POST /api/buyers/:buyerId/reject
 * POST /api/buyers/:buyerId/skip
 */

// ── Named routes BEFORE param routes ──────────────────────────────────────────
router.get('/queue', getBuyerQueue);
router.get('/', getApprovedBuyers);

// ── Param routes ───────────────────────────────────────────────────────────────
router.get('/:buyerId', getBuyer);
router.post('/:buyerId/approve', approveBuyer);
router.post('/:buyerId/reject', rejectBuyer);
router.post('/:buyerId/skip', skipBuyer);

module.exports = router;
