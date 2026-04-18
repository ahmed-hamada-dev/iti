const ratingService = require('./rating.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const createRating = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const rating = await ratingService.createOrUpdateRating(req.body, req.user._id);
  
  res.json({
    success: true,
    data: rating
  });
});

const getRatings = asyncHandler(async (req, res, next) => {
  const result = await ratingService.getRatings(req.query);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { createRating, getRatings };