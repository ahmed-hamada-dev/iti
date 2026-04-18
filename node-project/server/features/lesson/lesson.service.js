const Lesson = require('./lesson.model');
const Course = require('../course/course.model');
const Enrollment = require('../enrollment/enrollment.model');
const ApiError = require('../../helpers/ApiError');

const createLesson = async (lessonData, userId) => {
  const course = await Course.findById(lessonData.courseId);
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }

  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to add lessons to this course');
  }

  const lesson = await Lesson.create(lessonData);
  await lesson.populate('courseId', 'title');
  
  return lesson;
};

const getLessons = async (filters, userId) => {
  const { courseId, chapterId } = filters;
  let query = {};

  if (courseId) query.courseId = courseId;
  if (chapterId) query.chapterId = chapterId;

  const lessons = await Lesson.find(query)
    .populate('courseId', 'title instructorId')
    .sort({ order: 1 });

  if (userId) {
    const filteredLessons = await Promise.all(
      lessons.map(async (lesson) => {
        const course = lesson.courseId;
        const isOwner = course.instructorId?.toString() === userId.toString();
        
        if (isOwner) return lesson;
        
        const enrollment = await Enrollment.findOne({
          userId,
          courseId: course._id
        });
        
        if (!enrollment) {
          return { 
            _id: lesson._id, 
            title: lesson.title, 
            order: lesson.order, 
            courseId: { _id: course._id, title: course.title },
            chapterId: lesson.chapterId,
            content: null,
            videoUrl: null
          };
        }
        
        return lesson;
      })
    );

    return {
      count: filteredLessons.length,
      data: filteredLessons
    };
  }

  const publicLessons = lessons.map((lesson) => ({
    _id: lesson._id,
    title: lesson.title,
    order: lesson.order,
    courseId: { _id: lesson.courseId._id, title: lesson.courseId.title },
    chapterId: lesson.chapterId,
    content: null,
    videoUrl: null
  }));

  return {
    count: publicLessons.length,
    data: publicLessons
  };
};

const getLessonById = async (lessonId, userId) => {
  const lesson = await Lesson.findById(lessonId).populate('courseId', 'title instructorId');
  
  if (!lesson) {
    throw ApiError.notFound('Lesson not found');
  }
  
  if (userId) {
    const course = lesson.courseId;
    const isOwner = course.instructorId?._id?.toString() === userId.toString();
    
    if (!isOwner) {
      const enrollment = await Enrollment.findOne({
        userId,
        courseId: course._id
      });
      
      if (!enrollment) {
        throw ApiError.forbidden('You must be enrolled to view this lesson');
      }
    }
  }
  
  return lesson;
};

const updateLesson = async (lessonId, userId, updateData) => {
  const lesson = await Lesson.findById(lessonId);
  
  if (!lesson) {
    throw ApiError.notFound('Lesson not found');
  }

  const course = await Course.findById(lesson.courseId);
  
  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to update this lesson');
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(
    lessonId,
    updateData,
    { new: true, runValidators: true }
  ).populate('courseId', 'title');

  return updatedLesson;
};

const deleteLesson = async (lessonId, userId) => {
  const lesson = await Lesson.findById(lessonId);
  
  if (!lesson) {
    throw ApiError.notFound('Lesson not found');
  }

  const course = await Course.findById(lesson.courseId);
  
  if (course.instructorId.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not authorized to delete this lesson');
  }

  await lesson.deleteOne();
  return { message: 'Lesson deleted successfully' };
};

module.exports = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson
};