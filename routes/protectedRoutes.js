const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({ message: 'Acceso permitido a datos protegidos', user: req.user });
});

module.exports = router;
