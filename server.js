const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('./config/dotenv');
 // const routes = require('./routes');
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 


app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Endpoint de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

