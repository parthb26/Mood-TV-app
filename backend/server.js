const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mood-tv-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
  res.send('Welcome to Mood TV App!');
});

const showSchema = new mongoose.Schema({
  title: String,
  genre: String,
  releaseDate: String,
  description: String,
  watched: Boolean
});

const userSchema = new mongoose.Schema({
  username: String,
  mood: String,
  preferences: [String]
});

const Show = mongoose.model('Show', showSchema);
const User = mongoose.model('User', userSchema);

app.get('/shows', async (req, res) => {
  const shows = await Show.find();
  res.json(shows);
});

app.post('/shows', async (req, res) => {
  const newShow = new Show(req.body);
  await newShow.save();
  res.status(201).send(newShow);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
