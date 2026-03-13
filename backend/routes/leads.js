'use strict';

const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');

// GET /api/leads
router.get('/', async (req, res) => {
  try {
    const leads = await Buyer.find()
      .lean()
      .limit(50)
      .sort({ _id: 1 });

    res.json({
      success: true,
      data: leads,
    });
  } catch (err) {
    console.error('Leads fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;