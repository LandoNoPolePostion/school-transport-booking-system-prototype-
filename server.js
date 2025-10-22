const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve everything in your main folder
app.use(express.static(__dirname));

// In-memory booking data (temporary)
let bookings = [];

// API to add a booking
app.post('/book', (req, res) => {
  bookings.push(req.body);
  res.json({ success: true });
});

// API to get all bookings for 7 days
app.get('/bookings', (req, res) => {
  const now = new Date();
  const sevenDays = new Date();
  sevenDays.setDate(now.getDate() + 7);
  const filtered = bookings.filter(b => {
    const d = new Date(b.date);
    return d >= now && d <= sevenDays;
  });
  res.json(filtered);
});

// Serve your main HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
