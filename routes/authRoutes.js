const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkUserRole = require('../middleware/checkUserRole');
router.post('/register',checkUserRole('admin', 'manager'), authController.register);
router.post('/login', authController.login);

module.exports = router;