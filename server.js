const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const { readProductFromXlsx } = require('./controllers/products');

const app = express();
app.use(cors());

// Connect Database
connectDB();
// readProductFromXlsx();
// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/products', require('./routes/api/products'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
