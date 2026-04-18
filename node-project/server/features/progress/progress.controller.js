const progressService = require('./progress.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const createOrUpdateProgress = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const progress = await progressService.createOrUpdateProgress(req.body, req.user._id);
  
  res.json({
    success: true,
    data: progress
  });
});

const getProgress = asyncHandler(async (req, res, next) => {
  const result = await progressService.getProgress(req.query, req.user._id);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { createOrUpdateProgress, getProgress };