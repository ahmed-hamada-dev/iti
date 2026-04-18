const Progress = require('./progress.model');
const Lesson = require('../lesson/lesson.model');
const ApiError = require('../../helpers/ApiError');

const createOrUpdateProgress = async (progressData, userId) => {
  const lesson = await Lesson.findById(progressData.lessonId);
  
  if (!lesson) {
    throw ApiError.notFound('Lesson not found');
  }

  const progress = await Progress.findOneAndUpdate(
    { userId, lessonId: progressData.lessonId },
    { completed: progressData.completed },
    { new: true, upsert: true }
  ).populate('lessonId', 'title');

  return progress;
};

const getProgress = async (filters, userId) => {
  let query = {};

  if (filters.userId) {
    query.userId = filters.userId;
  } else {
    query.userId = userId;
  }

  const progress = await Progress.find(query)
    .populate('userId', 'name')
    .populate('lessonId', 'title courseId');

  return {
    count: progress.length,
    data: progress
  };
};

module.exports = { createOrUpdateProgress, getProgress };