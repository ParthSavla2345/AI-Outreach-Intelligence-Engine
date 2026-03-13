// quick syntax test
const s = require('./utils/scoringEngine');
const m = require('./models/Buyer');
const ml = require('./services/mlService');
const c = require('./controllers/buyerController');
const r = require('./routes/buyers');
console.log('Score test:', s.computeScore({
    revenue_score: 50,
    Job_Promotion_Flag: 1,
    Hiring_Increase_Flag: 1,
    priority_tier: 'Hot',
    urgency_level: 'Immediate',
    Tariff_News_Impact: 0.5,
    War_News_Impact: 0.5,
    Market_News_Impact: 0.5
}));
console.log('ALL REQUIRES OK');
