const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Express + MySQL + Memcached API');
});

module.exports = app;
