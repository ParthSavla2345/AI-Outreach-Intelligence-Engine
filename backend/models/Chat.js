const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],   // ← added 'system' which is useful
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
}, { _id: false });   // ← good: subdocuments usually don't need own _id

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,          // ← good for queries by user
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
  timestamps: true,       // ← automatically adds createdAt & updatedAt
});

// Keep lastUpdated in sync (works together with timestamps)
chatSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

// Optional but very useful: limit message history to prevent DB bloat
chatSchema.pre('save', function (next) {
  if (this.messages.length > 200) {
    this.messages = this.messages.slice(-200); // keep the last 200 messages
  }
  next();
});

// Safe model export – prevents OverwriteModelError in dev with nodemon/hot-reload
module.exports = mongoose.models.Chat || mongoose.model('Chat', chatSchema);