const Course = require('./course.model');
const ApiError = require('../../helpers/ApiError');

const createCourse = async (courseData, instructorId) => {
  const course = await Course.create({
    ...courseData,
    instructorId
  });
  
  await course.populate('instructorId', 'name email');
  return course;
};

const getCourses = async (filters) => {
  const { id, instructorId, category, search } = filters;
  let query = {};

  if (id) query._id = id;
  if (instructorId) query.instructorId = instructorId;
  if (category) query.category = category;
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const courses = await Course.find(query)
    .populate('instructorId', 'name email')
    .sort({ createdAt: -1 });

  return {
    count: courses.length,
    data: courses
  };
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId).populate('instructorId', 'name email');
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }
  
  return course;
};

const updateCourse = async (courseId, userId, updateData) => {
  const course = await Course.findById(courseId);
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }

  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to update this course');
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    updateData,
    { new: true, runValidators: true }
  ).populate('instructorId', 'name email');

  return updatedCourse;
};

const deleteCourse = async (courseId, userId) => {
  const course = await Course.findById(courseId);
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }

  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to delete this course');
  }

  await course.deleteOne();
  return { message: 'Course deleted successfully' };
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};