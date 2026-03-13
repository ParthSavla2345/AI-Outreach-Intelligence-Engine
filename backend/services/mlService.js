// backend/services/mlService.js
'use strict';

const { spawn } = require('child_process');
const path = require('path');

/**
 * Calls the Python ML script predict.py and returns the recommended channel.
 *
 * Features sent (JSON over stdin):
 *   revenue_score, Tariff_News_Impact, War_News_Impact,
 *   Market_News_Impact, Hiring_Increase_Flag, Job_Promotion_Flag
 *
 * @param {Object} buyer - Buyer document or plain object with feature fields
 * @returns {Promise<string>} - "email" | "call" | "linkedin"
 */
async function predictChannel(buyer) {
    return new Promise((resolve) => {
        const features = {
            revenue_score: Number(buyer.Revenue_Growth_Score) || 0,
            Tariff_News_Impact: Number(buyer.Tariff_News_Impact) || 0,
            War_News_Impact: Number(buyer.War_News_Impact) || 0,
            Market_News_Impact: Number(buyer.Market_News_Impact) || 0,
            Hiring_Increase_Flag: Number(buyer.Hiring_Increase_Flag) || 0,
            Job_Promotion_Flag: Number(buyer.Job_Promotion_Flag) || 0,
        };

        const scriptPath = path.join(__dirname, '..', 'ml', 'predict.py');

        // Try python3 first, then python
        const cmd = process.platform === 'win32' ? 'python' : 'python3';

        let proc;
        try {
            proc = spawn(cmd, [scriptPath], {
                stdio: ['pipe', 'pipe', 'pipe'],
            });
        } catch (err) {
            console.error('[mlService] Failed to spawn Python process:', err.message);
            return resolve(ruleBasedChannel(features));
        }

        let stdout = '';
        let stderr = '';

        proc.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
        proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

        proc.on('close', (code) => {
            if (stderr) console.error('[mlService] Python stderr:', stderr);

            try {
                const result = JSON.parse(stdout.trim());
                const channel = result.recommended_channel;
                if (['email', 'call', 'linkedin'].includes(channel)) {
                    return resolve(channel);
                }
                console.warn('[mlService] Unexpected channel value:', channel);
                resolve(ruleBasedChannel(features));
            } catch {
                console.error('[mlService] JSON parse error. stdout:', stdout);
                resolve(ruleBasedChannel(features));
            }
        });

        proc.on('error', (err) => {
            console.error('[mlService] Process error:', err.message);
            resolve(ruleBasedChannel(features));
        });

        // Write features JSON to Python stdin
        proc.stdin.write(JSON.stringify(features));
        proc.stdin.end();
    });
}

/**
 * Rule-based fallback channel selection (used when Python is unavailable).
 */
function ruleBasedChannel(features) {
    const { revenue_score, War_News_Impact, Market_News_Impact } = features;
    if (revenue_score > 60 && Market_News_Impact > 0.5) return 'linkedin';
    if (War_News_Impact > 0.5) return 'call';
    return 'email';
}

module.exports = { predictChannel };
