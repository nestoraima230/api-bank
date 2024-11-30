const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens, obtenida de las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Tiempo de expiración por defecto

// Generar un token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Validar y decodificar un token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('⚠️  Error al verificar el token:', err.message);
    return null; // Retorna null si el token no es válido
  }
};

// Middleware para autenticar usuarios basado en JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraer el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }

  req.user = decoded; // Agregar los datos del usuario decodificados a la solicitud
  next(); // Continuar con el siguiente middleware o controlador
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
};
