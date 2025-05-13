require('dotenv').config();
const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
const db = require('./config/db');

// Middleware
app.use(express.json());

// Content-Type validation middleware
app.use('/api/schools', (req, res, next) => {
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(415).json({ 
      error: 'Unsupported Media Type', 
      message: 'Content-Type must be application/json' 
    });
  }
  next();
});

// Routes
app.use('/api/schools', schoolRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`- POST /api/schools - Add a new school`);
  console.log(`- GET /api/schools?latitude=xx&longitude=yy - List schools by proximity`);
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server and DB connections...');
  await db.end();
  server.close(() => {
    console.log('Server and DB connections closed.');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing HTTP server and DB connections...');
  await db.end();
  server.close(() => {
    console.log('Server and DB connections closed.');
    process.exit(0);
  });
});
