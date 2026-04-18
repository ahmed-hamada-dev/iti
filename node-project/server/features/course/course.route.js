const express = require('express');
const router = express.Router();
const courseController = require('./course.controller');
const courseValidator = require('./course.validator');
const { protect } = require('../../middlewares/authMiddleware');
const { authorize } = require('../../middlewares/roleMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.get('/', courseValidator.getCourses, asyncHandler(courseController.getCourses));
router.get('/single', asyncHandler(courseController.getCourseById));
router.post('/', protect, authorize('Instructor'), courseValidator.createCourse, asyncHandler(courseController.createCourse));
router.put('/', protect, authorize('Instructor'), courseValidator.updateCourse, asyncHandler(courseController.updateCourse));
router.delete('/', protect, authorize('Instructor'), asyncHandler(courseController.deleteCourse));

module.exports = router;