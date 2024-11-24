const express = require('express');
const cors = require('cors');
const { pool, testConnection } = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    res.json({ 
      status: 'ok',
      message: 'Server is running',
      database: dbConnected ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

// Test users endpoint with proper error handling
app.get('/test-users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error querying database',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something broke!'
  });
});

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    // Verificar conexión a la base de datos antes de iniciar el servidor
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('Unable to connect to database. Server will not start.');
      process.exit(1);
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Database connected successfully`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

start();