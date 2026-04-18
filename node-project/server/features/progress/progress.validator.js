const { body, query } = require('express-validator');

const createOrUpdateProgress = [
  body('lessonId')
    .isMongoId().withMessage('Invalid lesson ID'),
  body('completed')
    .isBoolean().withMessage('Completed must be a boolean')
];

const getProgress = [
  query('userId').optional().isMongoId().withMessage('Invalid user ID')
];

module.exports = { createOrUpdateProgress, getProgress };