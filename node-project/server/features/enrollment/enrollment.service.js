const Enrollment = require('./enrollment.model');
const Course = require('../course/course.model');
const ApiError = require('../../helpers/ApiError');

const createEnrollment = async (courseId, userId) => {
  const course = await Course.findById(courseId);
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }

  if (course.instructorId.toString() === userId.toString()) {
    throw ApiError.forbidden('You cannot enroll in your own course');
  }

  const existingEnrollment = await Enrollment.findOne({ userId, courseId });
  
  if (existingEnrollment) {
    throw ApiError.conflict('Already enrolled in this course');
  }

  const enrollment = await Enrollment.create({ userId, courseId });
  
  await enrollment.populate([
    { path: 'userId', select: 'name email' },
    { path: 'courseId', select: 'title description instructorId' }
  ]);

  return enrollment;
};

const getEnrollments = async (filters) => {
  const { userId } = filters;
  let query = {};

  if (userId) query.userId = userId;

  const enrollments = await Enrollment.find(query)
    .populate('userId', 'name email')
    .populate('courseId', 'title description instructorId')
    .sort({ createdAt: -1 });

  return {
    count: enrollments.length,
    data: enrollments
  };
};

module.exports = { createEnrollment, getEnrollments };