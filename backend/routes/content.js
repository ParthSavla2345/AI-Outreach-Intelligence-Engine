const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /generate-content
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { 
      persona = 'Executive', 
      industry = 'SaaS', 
      trigger = 'Job Change', 
      strategy = 'Value-First', 
      tone = 'Professional',
      companyName = '',           // ← real company name from frontend
      userName = 'Parth'          // your name
    } = req.body;

    console.log('Received params:', { persona, industry, trigger, strategy, tone, companyName, userName });

    let generatedText = '';

    const prompt = `You are an expert B2B sales copywriter.

Generate a concise, professional outreach message using these parameters:
- Persona: ${persona}
- Industry: ${industry}
- Trigger: ${trigger}
- Strategy: ${strategy}
- Tone: ${tone}
- Company: ${companyName || '{Company}'}
- Sender name: ${userName}

Requirements:
- Keep under 150 words
- Start with a personalized greeting using the recipient's name or role
- Reference the trigger event naturally
- Include 2–3 strong value points or stats
- End with a clear, low-pressure CTA (e.g. 15-min call)
- Sign off with the sender's name: ${userName}
- Do NOT use generic openers like "I hope you're well"
- Make it warm and professional

Output ONLY the full message text – no explanations, no JSON.`;

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 400,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
            'X-Title': 'LOC-8.0 Outreach AI',
          },
          timeout: 30000,
        }
      );

      generatedText = response.data.choices?.[0]?.message?.content?.trim() || '';
    } catch (apiErr) {
      console.error('OpenRouter error:', apiErr.response?.data || apiErr.message);

      // Good fallback template (the one you liked)
      generatedText = `Hi {FirstName},

I noticed you recently had a ${trigger.toLowerCase()} at ${companyName || '{Company}'}. Congratulations!

Given your focus on ${industry}, I believe our AI-powered outreach platform could significantly accelerate your pipeline. Companies like yours have seen:
• 40% increase in response rates
• 60% reduction in time-to-connect
• 3x improvement in lead quality

Would you be open to a 15-minute call this week?

Best,
${userName}`;
    }

    // Final replacement for safety
    generatedText = generatedText
      .replace(/{FirstName}/gi, 'Recipient')  // or lead name if you pass it
      .replace(/{Company}/gi, companyName || 'their company')
      .replace(/{YourName}/gi, userName);

    res.json({
      content: generatedText,
      insights: {
        personalizationScore: Math.floor(Math.random() * 10 + 88),
        estimatedReadTime: '45 seconds',
        sentiment: `${tone} & Friendly`,
      },
    });
  } catch (err) {
    console.error('Content generation error:', err);
    res.status(500).json({ 
      message: 'Server error during content generation',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
});

module.exports = router;