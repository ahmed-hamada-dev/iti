const { body, query } = require('express-validator');

const createEnrollment = [
  body('courseId')
    .isMongoId().withMessage('Invalid course ID')
];

const getEnrollments = [
  query('userId').optional().isMongoId().withMessage('Invalid user ID')
];

module.exports = { createEnrollment, getEnrollments };