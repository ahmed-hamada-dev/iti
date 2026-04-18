const { body, query } = require('express-validator');

const createComment = [
  body('lessonId')
    .isMongoId().withMessage('Invalid lesson ID'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters')
];

const getComments = [
  query('lessonId').optional().isMongoId().withMessage('Invalid lesson ID')
];

module.exports = { createComment, getComments };