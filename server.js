const express = require('express');
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});
// Endpoint
app.get('/test-user', async (req, res) => {
  console.log('Ejecutando consulta: SELECT * FROM Users');
  try {
    const [rows] = await db.query('SELECT * FROM Users'); 
    console.log('Resultados de la consulta:', rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error en la consulta:', error.message);
    res.status(500).json({ error: true, message: 'Error al obtener usuarios' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
