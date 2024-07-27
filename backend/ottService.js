// backend/ottService.js
const axios = require('axios');

// Function to fetch watch history from an external API
async function getWatchHistory(userId) {
  try {
    // Replace this URL with the actual API endpoint
    const response = await axios.get(`https://api.example.com/users/${userId}/watch-history`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching watch history for user ${userId}:`, error);
    throw error;
  }
}

module.exports = { getWatchHistory };
