const express = require('express');
const registerController = require('../controllers/register');
const ensureToken = require('../token')


const router = express.Router();

router.post('/signup', registerController.createUser);
router.get('/getUser/:id', ensureToken, registerController.getUserProfile);
router.patch('/updateUser/:id', registerController.updateUserProfile);

module.exports = router;