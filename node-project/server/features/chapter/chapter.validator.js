const { body, query } = require('express-validator');

const createChapterValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Chapter title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('courseId')
    .notEmpty().withMessage('Course ID is required')
    .isMongoId().withMessage('Invalid course ID format'),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const updateChapterValidator = [
  query('id')
    .notEmpty().withMessage('Chapter ID is required')
    .isMongoId().withMessage('Invalid chapter ID format'),
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Chapter title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

const deleteChapterValidator = [
  query('id')
    .notEmpty().withMessage('Chapter ID is required')
    .isMongoId().withMessage('Invalid chapter ID format')
];

module.exports = {
  createChapterValidator,
  updateChapterValidator,
  deleteChapterValidator
};
