// backend/utils/scoringEngine.js
'use strict';

/**
 * Computes a normalised decision score (0–100) and a decision label
 * for a buyer document using the specified formula.
 *
 * @param {Object} buyer - Mongoose buyer document or plain object
 * @returns {{ score: number, label: string }}
 */
function computeScore(buyer) {
    // ── 1. Base ───────────────────────────────────────────────────────────────
    // Using Revenue_Size_USD, though raw numbers might be huge or tiny.
    // If the data provides Revenue_Growth_Score (0-1), scaling that up to 25 is better.
    const base = (Number(buyer.Revenue_Growth_Score) || 0) * 25;

    // ── 2. Flags ──────────────────────────────────────────────────────────────
    const promotion = (Number(buyer.Job_Promotion_Flag) || 0) * 10;
    const hiring = (Number(buyer.Hiring_Increase_Flag) || 0) * 15;

    // ── 3. Priority Tier ──────────────────────────────────────────────────────
    const priorityMap = { Hot: 25, Warm: 15, Cold: 5 };
    const priority = priorityMap[buyer.priority_tier] ?? 5;

    // ── 4. Urgency ────────────────────────────────────────────────────────────
    // DB has `urgency_score_raw` (approx 0.0-1.0)
    const urgency = Math.min((Number(buyer.urgency_score_raw) || 0) * 20, 20);

    // ── 5. News Impact ────────────────────────────────────────────────────────
    const news =
        (Number(buyer.Tariff_News_Impact) || 0) * 20 +
        (Number(buyer.War_News_Impact) || 0) * 30 +
        (Number(buyer.Market_News_Impact) || 0) * 25;

    // ── 6. Raw Sum ────────────────────────────────────────────────────────────
    const raw = base + promotion + hiring + priority + urgency + news;

    // ── 7. Normalise to 0–100 ─────────────────────────────────────────────────
    // Max possible: 25(base@100) + 10 + 15 + 25 + 20 + 75(news max) = 170
    const MAX_RAW = 170;
    const score = Math.min(100, Math.max(0, Math.round((raw / MAX_RAW) * 100)));

    // ── 8. Decision Label ─────────────────────────────────────────────────────
    let label;
    if (score >= 75) label = 'Strong Approve';
    else if (score >= 50) label = 'Consider Approve';
    else if (score >= 30) label = 'Skip';
    else label = 'Reject';

    return { score, label };
}

module.exports = { computeScore };
