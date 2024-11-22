const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
