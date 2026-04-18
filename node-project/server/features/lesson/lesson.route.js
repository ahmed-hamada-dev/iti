const express = require('express');
const router = express.Router();
const lessonController = require('./lesson.controller');
const lessonValidator = require('./lesson.validator');
const { protect } = require('../../middlewares/authMiddleware');
const { optionalProtect } = require('../../middlewares/optionalAuthMiddleware');
const { authorize } = require('../../middlewares/roleMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.get('/', optionalProtect, lessonValidator.getLessons, asyncHandler(lessonController.getLessons));
router.post('/', protect, authorize('Instructor'), lessonValidator.createLesson, asyncHandler(lessonController.createLesson));
router.put('/', protect, authorize('Instructor'), lessonValidator.updateLesson, asyncHandler(lessonController.updateLesson));
router.delete('/', protect, authorize('Instructor'), asyncHandler(lessonController.deleteLesson));

module.exports = router;