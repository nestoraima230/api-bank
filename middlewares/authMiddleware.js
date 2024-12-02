const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado 'Authorization'
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token usando jsonwebtoken
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    req.user = decoded;  // Decodificar el token y agregar la información al objeto req
    next();  // Llamar al siguiente middleware o controlador
  });
};

module.exports = authenticateToken;
