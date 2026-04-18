const express = require('express');
const router = express.Router();
const chapterController = require('./chapter.controller');
const { protect } = require('../../middlewares/authMiddleware');
const { 
  createChapterValidator, 
  updateChapterValidator, 
  deleteChapterValidator 
} = require('./chapter.validator');

router.route('/')
  .get(chapterController.getChapters)
  .post(protect, createChapterValidator, chapterController.createChapter)
  .put(protect, updateChapterValidator, chapterController.updateChapter)
  .delete(protect, deleteChapterValidator, chapterController.deleteChapter);

module.exports = router;
