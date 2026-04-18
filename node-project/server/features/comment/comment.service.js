const Comment = require('./comment.model');
const Lesson = require('../lesson/lesson.model');
const ApiError = require('../../helpers/ApiError');

const createComment = async (commentData, userId) => {
  const lesson = await Lesson.findById(commentData.lessonId);
  
  if (!lesson) {
    throw ApiError.notFound('Lesson not found');
  }

  const comment = await Comment.create({
    ...commentData,
    userId
  });
  
  await comment.populate('userId', 'name');
  
  return comment;
};

const getComments = async (filters) => {
  const { lessonId } = filters;
  let query = {};

  if (lessonId) query.lessonId = lessonId;

  const comments = await Comment.find(query)
    .populate('userId', 'name')
    .populate('lessonId', 'title')
    .sort({ createdAt: -1 });

  return {
    count: comments.length,
    data: comments
  };
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  
  if (!comment) {
    throw ApiError.notFound('Comment not found');
  }

  if (comment.userId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to delete this comment');
  }

  await comment.deleteOne();
  return { message: 'Comment deleted successfully' };
};

module.exports = { createComment, getComments, deleteComment };