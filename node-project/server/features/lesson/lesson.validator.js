const { body, query } = require('express-validator');

const createLesson = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('courseId')
    .isMongoId().withMessage('Invalid course ID'),
  body('chapterId')
    .isMongoId().withMessage('Invalid chapter ID'),
  body('order')
    .optional()
    .isInt().withMessage('Order must be a number'),
  body('videoUrl')
    .optional()
    .trim()
];

const updateLesson = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty'),
  body('content')
    .optional()
    .trim()
    .notEmpty().withMessage('Content cannot be empty'),
  body('order')
    .optional()
    .isInt().withMessage('Order must be a number'),
  body('videoUrl')
    .optional()
    .trim()
];

const getLessons = [
  query('courseId').optional().isMongoId().withMessage('Invalid course ID'),
  query('chapterId').optional().isMongoId().withMessage('Invalid chapter ID')
];

module.exports = { createLesson, updateLesson, getLessons };