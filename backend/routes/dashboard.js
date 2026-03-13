// routes/dashboard.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Buyer = require('../models/Buyer');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    // ── Counts ───────────────────────────────────────────────────────────────
    const totalApproved = await Buyer.countDocuments({
      approvedBy: userId,
      status: 'approved',
    });

    const highPriority = await Buyer.countDocuments({
      approvedBy: userId,
      status: 'approved',
      priority_tier: 'Hot',
    });

    const totalLeads = await Buyer.countDocuments({}); // global total (or filter if needed)

    const conversionRate = totalLeads > 0
      ? Math.round((totalApproved / totalLeads) * 100)
      : 0;

    // ── Channel Breakdown ────────────────────────────────────────────────────
    const channelBreakdown = await Buyer.aggregate([
      {
        $match: {
          approvedBy: userId,
          status: 'approved',
          recommended_channel: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: '$recommended_channel',
          leads: { $sum: 1 }
        }
      },
      {
        $project: {
          channel: '$_id',
          leads: 1,
          _id: 0
        }
      },
      { $sort: { leads: -1 } }
    ]);

    // Add color mapping on backend (optional - can also do in frontend)
    const colors = {
      linkedin: '#2d4a3e',
      email: '#6b9080',
      call: '#a4c3b2'
    };
    channelBreakdown.forEach(item => {
      item.color = colors[item.channel] || '#cce3de';
    });

    // ── Top Leads (up to 5) ──────────────────────────────────────────────────
    const topLeads = await Buyer.find({
      approvedBy: userId,
      status: 'approved'
    })
      .sort({ priority_score: -1, urgency_score_raw: -1 })
      .limit(5)
      .select('Buyer_ID company_name Industry priority_tier priority_score status')
      .lean();

    const formattedTopLeads = topLeads.map(lead => ({
      name: lead.company_name || `Decision Maker (${lead.Buyer_ID || 'N/A'})`,
      company: lead.Industry || lead.company_name || 'Unknown',
      score: Math.round(lead.priority_score || 0),
      stage: lead.priority_tier || 'Warm',
      delta: '+0' // placeholder - can calculate real delta later
    }));

    // ── Recommended Lead (highest priority) ──────────────────────────────────
    const topLead = await Buyer.findOne({
      approvedBy: userId,
      status: 'approved'
    })
      .sort({ priority_score: -1, urgency_score_raw: -1 })
      .select('Buyer_ID company_name Industry priority_tier recommended_channel priority_score')
      .lean();

    const recommendation = topLead ? {
      leadName: `Decision Maker (${topLead.Buyer_ID})`,
      company: topLead.company_name || topLead.Industry || 'Unknown Company',
      confidence: Math.min(95, Math.round(topLead.priority_score || 60)),
      strategy: topLead.priority_tier === 'Hot' ? 'Immediate Outreach' : 'Nurture First',
      channel: topLead.recommended_channel === 'call' ? 'Phone Call' :
               topLead.recommended_channel === 'linkedin' ? 'LinkedIn DM' : 'Email',
      timeWindow: 'Next 24–48 hours',
      rationale: [{ factor: 'High Priority Score', importance: Math.round(topLead.priority_score || 70) }],
    } : null;

    // ── Simple Funnel Approximation ──────────────────────────────────────────
    const funnel = [
      { stage: 'Total Leads', count: totalLeads, pct: 100 },
      { stage: 'Approved', count: totalApproved, pct: conversionRate },
      // Add more stages when you have contacted/meeting data
    ];

    // ── Response ─────────────────────────────────────────────────────────────
    res.json({
      success: true,
      kpis: [
        { label: 'Active Leads', value: totalApproved, trend: totalApproved > 0 ? '+N/A' : '—' },
        { label: 'High Priority', value: highPriority, trend: highPriority > 0 ? '+N/A' : '—' },
        { label: 'Conversion Rate', value: conversionRate, suffix: '%', trend: conversionRate > 0 ? '+N/A' : '—' },
        { label: 'Engagement Rate', value: 0, suffix: '%', trend: 'N/A' }, // future: needs outreach logs
      ],
      recommendation,
      funnel,
      channelBreakdown,
      topLeads: formattedTopLeads,
      // weeklyActivity, responseTime, meetingsBooked, revenueImpact remain static/fallback on frontend
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard data',
      error: err.message
    });
  }
});

module.exports = router;