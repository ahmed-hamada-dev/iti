const express = require('express');
const router = express.Router();
const ratingController = require('./rating.controller');
const ratingValidator = require('./rating.validator');
const { protect } = require('../../middlewares/authMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.post('/', protect, ratingValidator.createRating, asyncHandler(ratingController.createRating));
router.get('/', ratingValidator.getRatings, asyncHandler(ratingController.getRatings));

module.exports = router;