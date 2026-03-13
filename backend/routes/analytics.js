const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /analytics
router.get('/', authMiddleware, async (req, res) => {
    try {
        res.json({
            strategyData: [
                { strategy: 'Value-First', success: 85, attempts: 120 },
                { strategy: 'Authority', success: 78, attempts: 95 },
                { strategy: 'Trigger', success: 82, attempts: 110 },
                { strategy: 'Social-Proof', success: 71, attempts: 88 },
                { strategy: 'Educational', success: 68, attempts: 102 },
            ],
            channelPerformance: [
                { month: 'Jan', linkedin: 65, email: 52, comment: 45, content: 38 },
                { month: 'Feb', linkedin: 68, email: 54, comment: 48, content: 40 },
                { month: 'Mar', linkedin: 70, email: 56, comment: 50, content: 42 },
                { month: 'Apr', linkedin: 72, email: 58, comment: 52, content: 44 },
                { month: 'May', linkedin: 75, email: 60, comment: 55, content: 46 },
                { month: 'Jun', linkedin: 78, email: 62, comment: 58, content: 48 },
            ],
            responseLatency: [
                { day: 'Mon', avgHours: 8.2 },
                { day: 'Tue', avgHours: 6.5 },
                { day: 'Wed', avgHours: 5.8 },
                { day: 'Thu', avgHours: 6.2 },
                { day: 'Fri', avgHours: 7.8 },
                { day: 'Sat', avgHours: 12.5 },
                { day: 'Sun', avgHours: 15.2 },
            ],
            rlImprovement: [
                { week: 'W1', accuracy: 62 },
                { week: 'W2', accuracy: 68 },
                { week: 'W3', accuracy: 72 },
                { week: 'W4', accuracy: 76 },
                { week: 'W5', accuracy: 79 },
                { week: 'W6', accuracy: 82 },
                { week: 'W7', accuracy: 84 },
                { week: 'W8', accuracy: 87 },
            ],
            keyInsights: {
                bestStrategy: { name: 'Value-First', rate: 85 },
                topChannel: { name: 'LinkedIn DM', growth: '+12%' },
                optimalTime: { window: '2-4 PM', days: 'Tue-Thu' },
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
