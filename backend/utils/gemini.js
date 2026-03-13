// utils/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.75,
    topP: 0.95,
    maxOutputTokens: 400,
  },
});

async function generateAIResponse(history, newUserMessage) {
  try {
    // Convert mongoose-style messages to Gemini format
    const geminiHistory = history
      .filter(m => m.role !== "system") // skip system if any
      .map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({
      history: geminiHistory,
      generationConfig: {
        temperature: 0.75,
      },
    });

    const result = await chat.sendMessage(newUserMessage);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini error:", err);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}

// Very naive meeting intent detection (you can improve later with structured output)
function detectMeetingIntent(userMessage, aiResponse) {
  const text = (userMessage + " " + aiResponse).toLowerCase();

  if (!/yes|sure|okay|great|perfect|book|schedule|set|confirm|let.?s|time|date|call|meeting|demo/i.test(text)) {
    return null;
  }

  // Look for time-like patterns
  const timeMatch =
    text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i) ||
    text.match(/\d{1,2}\s*(am|pm)/i) ||
    text.match(/tomorrow|friday|monday|tuesday|wednesday|thursday|next week/i);

  if (!timeMatch) return null;

  const timeStr = timeMatch[0];

  return {
    title: "Call / Demo",
    date: "TBD",           // ← improve later
    time: timeStr,
    duration: "30 min",
    type: "video",
    status: "upcoming",
    gradient: "from-[#6b9080] to-[#a4c3b2]",
  };
}

module.exports = { generateAIResponse, detectMeetingIntent };