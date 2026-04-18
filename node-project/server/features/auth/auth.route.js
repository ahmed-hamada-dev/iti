const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authValidator = require('./auth.validator');
const { protect } = require('../../middlewares/authMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.post('/register', authValidator.register, authController.register);
router.post('/login', authValidator.login, authController.login);
router.post('/refresh', authValidator.refreshToken, authController.refreshToken);
router.post('/logout', protect, asyncHandler(authController.logout));
router.get('/me', protect, asyncHandler(authController.getMe));

module.exports = router;