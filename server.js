const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db'); 
const authenticateToken  = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api/protected', authenticateToken, protectedRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transaction', transactionRoutes);

const cardRoutes = require('./routes/cardRoutes');
app.use('/api/cards', cardRoutes);  // Registro de rutas de tarjetas

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

const balanceRoutes = require('./routes/balanceRoutes');  
app.use('/api/balance', balanceRoutes);

const movementsRoutes = require('./routes/movementsRoutes');
app.use('/api', movementsRoutes);

const servicesRoutes = require('./routes/servicesRoutes');
app.use('/api/services', servicesRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Endpoint de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
