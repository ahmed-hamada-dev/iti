const express = require('express');
const router = express.Router();
const enrollmentController = require('./enrollment.controller');
const enrollmentValidator = require('./enrollment.validator');
const { protect } = require('../../middlewares/authMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.post('/', protect, enrollmentValidator.createEnrollment, asyncHandler(enrollmentController.createEnrollment));
router.get('/', asyncHandler(enrollmentController.getEnrollments));

module.exports = router;