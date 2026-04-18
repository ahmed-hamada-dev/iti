const chapterService = require('./chapter.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const getChapters = asyncHandler(async (req, res, next) => {
  const result = await chapterService.getChapters(req.query.courseId);
  
  res.json({
    success: true,
    ...result
  });
});

const createChapter = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const chapter = await chapterService.createChapter(req.body, req.user._id);
  
  res.status(201).json({
    success: true,
    data: chapter
  });
});

const updateChapter = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const chapter = await chapterService.updateChapter(req.query.id, req.user._id, req.body);
  
  res.json({
    success: true,
    data: chapter
  });
});

const deleteChapter = asyncHandler(async (req, res, next) => {
  const result = await chapterService.deleteChapter(req.query.id, req.user._id);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { getChapters, createChapter, updateChapter, deleteChapter };
