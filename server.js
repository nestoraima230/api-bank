const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db'); // Aquí usas la conexión a la base de datos

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Endpoint de prueba
app.get('/test-users', (req, res) => {
  const query = 'SELECT * FROM Users'; 

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }

    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
