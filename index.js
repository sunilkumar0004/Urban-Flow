const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movementRoutes = require('./routes/movementRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route (IMPORTANT)
app.get('/', (req, res) => {
  res.send('UrbanFlow Backend Running 🚦');
});

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/urbanflow')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/movement', movementRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
