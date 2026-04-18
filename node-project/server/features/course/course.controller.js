const courseService = require('./course.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const getCourses = asyncHandler(async (req, res, next) => {
  const result = await courseService.getCourses(req.query);
  
  res.json({
    success: true,
    ...result
  });
});

const getCourseById = asyncHandler(async (req, res, next) => {
  const course = await courseService.getCourseById(req.query.id);
  
  res.json({
    success: true,
    data: [course]
  });
});

const createCourse = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const course = await courseService.createCourse(req.body, req.user._id);
  
  res.status(201).json({
    success: true,
    data: course
  });
});

const updateCourse = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const course = await courseService.updateCourse(req.query.id, req.user._id, req.body);
  
  res.json({
    success: true,
    data: course
  });
});

const deleteCourse = asyncHandler(async (req, res, next) => {
  const result = await courseService.deleteCourse(req.query.id, req.user._id);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };