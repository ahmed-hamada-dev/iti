const { body, param } = require('express-validator');

const register = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['Instructor', 'Student']).withMessage('Role must be Instructor or Student')
];

const login = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

const refreshToken = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required')
];

const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

module.exports = { register, login, refreshToken, validateId };