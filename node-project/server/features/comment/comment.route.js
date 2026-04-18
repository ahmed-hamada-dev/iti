const express = require('express');
const router = express.Router();
const commentController = require('./comment.controller');
const commentValidator = require('./comment.validator');
const { protect } = require('../../middlewares/authMiddleware');
const asyncHandler = require('../../helpers/asyncHandler');

router.get('/', commentValidator.getComments, asyncHandler(commentController.getComments));
router.post('/', protect, commentValidator.createComment, asyncHandler(commentController.createComment));
router.delete('/', protect, asyncHandler(commentController.deleteComment));

module.exports = router;