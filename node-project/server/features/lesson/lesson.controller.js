const lessonService = require('./lesson.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const getLessons = asyncHandler(async (req, res, next) => {
  const result = await lessonService.getLessons(req.query, req.user?._id);
  
  res.json({
    success: true,
    ...result
  });
});

const createLesson = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const lesson = await lessonService.createLesson(req.body, req.user._id);
  
  res.status(201).json({
    success: true,
    data: lesson
  });
});

const updateLesson = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const lesson = await lessonService.updateLesson(req.query.id, req.user._id, req.body);
  
  res.json({
    success: true,
    data: lesson
  });
});

const deleteLesson = asyncHandler(async (req, res, next) => {
  const result = await lessonService.deleteLesson(req.query.id, req.user._id);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { getLessons, createLesson, updateLesson, deleteLesson };