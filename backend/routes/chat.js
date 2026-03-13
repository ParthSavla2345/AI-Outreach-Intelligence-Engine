// models/Chat.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    trim: true,
    default: 'New Conversation',
  },
  messages: [messageSchema],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Update lastUpdated on every save
chatSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

// Auto-trim messages array (keep last 200 messages max)
chatSchema.pre('save', function (next) {
  if (this.messages.length > 200) {
    this.messages = this.messages.slice(-200);
  }
  next();
});

module.exports = mongoose.model('Chat', chatSchema);