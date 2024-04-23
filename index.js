// index.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js application!');
});


app.get('/api/data', (req, res) => {
  const data = {
      message: 'This is your API endpoint!',
      timestamp: Date.now()
  };
  res.json(data);
});
app.use('/auth', authRoutes);
app.use('/api', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
