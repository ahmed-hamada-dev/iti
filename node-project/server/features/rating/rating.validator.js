const { body, query } = require('express-validator');

const createRating = [
  body('courseId')
    .isMongoId().withMessage('Invalid course ID'),
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
];

const getRatings = [
  query('courseId').optional().isMongoId().withMessage('Invalid course ID')
];

module.exports = { createRating, getRatings };