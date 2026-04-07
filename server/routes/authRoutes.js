const express = require('express');
const router = express.Router();
const { signup, login, logout, refresh, profile } = require('../controllers/authController');
const { validate, signupSchema, loginSchema } = require('../middleware/validate');
const verifyToken = require('../middleware/verifyToken');

// Test
router.get('/test', (req, res) => res.json({ message: 'Auth routes working' }));

// Public routes
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);

// Protected routes (need valid access token)
router.get('/profile', verifyToken, profile);

module.exports = router;