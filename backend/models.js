// backend/models.js
const mongoose = require('mongoose');

// Define a schema for watch history
const watchHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  platform: { type: String, required: true },
  watchedShows: [
    {
      showId: { type: String, required: true },
      title: { type: String, required: true },
      progress: { type: Number, required: true },
      liked: { type: Boolean, required: true }
    }
  ]
});

// Create a model based on the schema
const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);

module.exports = { WatchHistory };
