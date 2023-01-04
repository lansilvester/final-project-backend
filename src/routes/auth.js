const express = require('express');
const router = express.Router();

const {register, login, getMe} = require('../controllers/auth')
const {protect} = require('../authMiddleware');

router.post('/signup', register)
router.post('/signin', login)
router.get('/me', protect, getMe)

module.exports = router;