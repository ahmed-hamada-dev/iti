const commentService = require('./comment.service');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');
const { validationResult } = require('express-validator');

const createComment = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const comment = await commentService.createComment(req.body, req.user._id);
  
  res.status(201).json({
    success: true,
    data: comment
  });
});

const getComments = asyncHandler(async (req, res, next) => {
  const result = await commentService.getComments(req.query);
  
  res.json({
    success: true,
    ...result
  });
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const result = await commentService.deleteComment(req.query.id, req.user._id);
  
  res.json({
    success: true,
    ...result
  });
});

module.exports = { createComment, getComments, deleteComment };