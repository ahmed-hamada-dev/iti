const enrollmentService = require('./enrollment.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const createEnrollment = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const enrollment = await enrollmentService.createEnrollment(req.body.courseId, req.user._id);
  
  res.status(201).json({
    success: true,
    data: enrollment
  });
});

const getEnrollments = asyncHandler(async (req, res, next) => {
  const result = await enrollmentService.getEnrollments(req.query);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { createEnrollment, getEnrollments };