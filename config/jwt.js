const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; 

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Error', err.message);
    return null; 
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }

  req.user = decoded; 
  next(); 
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
};
