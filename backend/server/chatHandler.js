// server/chatHandler.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../models/Chat"); // adjust path

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
});

function extractTimeInfo(text) {
  // Very naive → improve later with regex / dateparser / LLM structured output
  const timePatterns = [
    /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
    /(\d{1,2})\s*(am|pm)/i,
    /tomorrow|friday|next\s*(monday|tuesday|wednesday|thursday|friday)/i,
  ];

  for (const pattern of timePatterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return null;
}

async function handleUserMessage(socket, data) {
  const { threadId, message, userId } = data;

  if (!message?.trim()) return;

  // 1. Save user message
  let chat = await Chat.findOne({ _id: threadId, userId });
  if (!chat) {
    chat = new Chat({
      _id: threadId, // assuming threadId is mongo _id or you map it
      userId,
      title: "Conversation with contact",
      messages: [],
    });
  }

  chat.messages.push({
    role: "user",
    content: message.trim(),
  });

  await chat.save();

  // 2. Send typing indicator
  socket.to(threadId).emit("typing", { user: "AI" });

  // 3. Call Gemini
  try {
    const chatHistory = chat.messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chatSession = model.startChat({ history: chatHistory.slice(0, -1) });

    const result = await chatSession.sendMessage(message.trim());
    let aiResponse = result.response.text().trim();

    // 4. Very basic intent + entity detection (later → use function calling)
    let meetingInfo = null;
    const lower = aiResponse.toLowerCase() + " " + message.toLowerCase();

    if (
      /schedule|book|set|arrange|let.?s|confirm|okay|sure|yes.*(time|date|call|meeting|demo)/i.test(lower) &&
      (lower.includes("am") || lower.includes("pm") || lower.match(/\d{1,2}/))
    ) {
      const timeStr = extractTimeInfo(lower) || "to be confirmed";
      meetingInfo = {
        title: "Call with contact",
        date: "TBD", // ← improve later
        time: timeStr,
        duration: "30 min",
        type: "video",
        status: "upcoming",
        gradient: "from-[#6b9080] to-[#a4c3b2]",
      };

      // Override or append confirmation message
      aiResponse = `Great! I've noted your interest in scheduling. I've set up a meeting for ${timeStr}. You can view / adjust it in the Meetings tab.`;
    }

    // 5. Save AI message
    chat.messages.push({
      role: "assistant",
      content: aiResponse,
    });
    chat.lastUpdated = new Date();
    await chat.save();

    // 6. Send response to frontend
    socket.to(threadId).emit("message", {
      id: Date.now(),
      role: "ai",
      content: aiResponse,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    // 7. If meeting detected → broadcast to update Meetings page
    if (meetingInfo) {
      socket.to("meetings-room").emit("meetingScheduled", {
        threadId,
        ...meetingInfo,
        contact: "Contact Name", // you can store / pass real name
      });
    }
  } catch (err) {
    console.error("Gemini error:", err);
    socket.to(threadId).emit("message", {
      role: "ai",
      content: "Sorry, I'm having trouble responding right now. Please try again.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  }
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join thread room
    socket.on("joinThread", (threadId) => {
      socket.join(threadId);
      console.log(`Socket ${socket.id} joined thread ${threadId}`);
    });

    // Join global meetings room (for sidebar updates)
    socket.on("joinMeetings", () => {
      socket.join("meetings-room");
    });

    socket.on("sendMessage", (data) => {
      handleUserMessage(socket, data);
    });

    socket.on("typing", (data) => {
      socket.to(data.threadId).emit("typing", { user: data.user });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};