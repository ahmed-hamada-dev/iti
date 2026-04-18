const express = require('express');
const router = express.Router();
const progressController = require('./progress.controller');
const progressValidator = require('./progress.validator');
const { protect } = require('../../middlewares/authMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.post('/', protect, progressValidator.createOrUpdateProgress, asyncHandler(progressController.createOrUpdateProgress));
router.get('/', protect, progressValidator.getProgress, asyncHandler(progressController.getProgress));

module.exports = router;