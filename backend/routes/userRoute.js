const express = require('express');
const { getProfile } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', verifyToken, getProfile);

module.exports = router;