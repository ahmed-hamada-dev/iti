const { body, query } = require('express-validator');

const createCourse = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('category')
    .optional()
    .trim(),
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be a valid URL')
];

const updateCourse = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .notEmpty().withMessage('Description cannot be empty')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('category')
    .optional()
    .trim(),
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be a valid URL')
];

const getCourses = [
  query('id').optional().isMongoId().withMessage('Invalid course ID'),
  query('instructorId').optional().isMongoId().withMessage('Invalid instructor ID'),
  query('category').optional().trim(),
  query('search').optional().trim()
];

module.exports = { createCourse, updateCourse, getCourses };