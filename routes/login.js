const express = require('express')
const loginController = require('../controllers/login');

const router = express.Router();

router.post('/api/login', loginController.loginControl)

module.exports = router;