// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const { getWatchHistory } = require('./ottService');
const { WatchHistory } = require('./models');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mood-tv-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route to fetch and save user watch history
app.get('/api/watch-history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const history = await getWatchHistory(userId);

    // Save to database
    await WatchHistory.updateOne(
      { userId: userId },
      { $set: { platform: 'Example OTT', watchedShows: history } },
      { upsert: true }
    );

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watch history' });
  }
});

// Route to save user mood
app.post('/api/user-mood/:userId', async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.params.userId;

    // Update or insert user mood
    // For simplicity, this is not implemented here but you can add it as needed

    res.status(200).json({ message: 'Mood updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update mood' });
  }
});

// Route to get recommendations based on mood
app.get('/api/recommendations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Get user's mood and watch history
    // This is a simple example; you should integrate a recommendation engine
    const userMood = 'happy'; // This should be fetched from the database
    const history = await WatchHistory.findOne({ userId: userId });

    // Example logic to recommend shows
    const recommendedShows = history.watchedShows.filter(show => {
      // Recommend shows based on mood
      return userMood === 'happy' && show.progress < 100; // Example logic
    });

    res.status(200).json(recommendedShows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
