const Chapter = require('./chapter.model');
const Course = require('../course/course.model');
const ApiError = require('../../helpers/ApiError');

const createChapter = async (chapterData, userId) => {
  const course = await Course.findById(chapterData.courseId);
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }

  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to add chapters to this course');
  }

  const chapter = await Chapter.create(chapterData);
  return chapter;
};

const getChapters = async (courseId) => {
  const chapters = await Chapter.find({ courseId }).sort({ order: 1 });
  return {
    count: chapters.length,
    data: chapters
  };
};

const updateChapter = async (chapterId, userId, updateData) => {
  const chapter = await Chapter.findById(chapterId);
  
  if (!chapter) {
    throw ApiError.notFound('Chapter not found');
  }

  const course = await Course.findById(chapter.courseId);
  
  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to update this chapter');
  }

  const updatedChapter = await Chapter.findByIdAndUpdate(
    chapterId,
    updateData,
    { new: true, runValidators: true }
  );

  return updatedChapter;
};

const deleteChapter = async (chapterId, userId) => {
  const chapter = await Chapter.findById(chapterId);
  
  if (!chapter) {
    throw ApiError.notFound('Chapter not found');
  }

  const course = await Course.findById(chapter.courseId);
  
  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to delete this chapter');
  }

  // NOTE: If lessons are nested under this chapter, we should technically 
  // delete them too or re-parent them. For this scope, we just delete the chapter.
  await chapter.deleteOne();
  return { message: 'Chapter deleted successfully' };
};

module.exports = {
  createChapter,
  getChapters,
  updateChapter,
  deleteChapter
};
