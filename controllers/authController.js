const userModel = require('../models/userModel');

const authController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const result = await userModel.registerUser(firstName, lastName, email, password);
      res.status(201).json(result);  
    } catch(error){
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await userModel.loginUser(email, password);
      res.status(200).json(result);  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = authController;
