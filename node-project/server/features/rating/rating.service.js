const Rating = require('./rating.model');
const Course = require('../course/course.model');
const ApiError = require('../../helpers/ApiError');

const createOrUpdateRating = async (ratingData, userId) => {
  const course = await Course.findById(ratingData.courseId);
  
  if (!course) {
    throw ApiError.notFound('Course not found');
  }

  let rating = await Rating.findOne({ userId, courseId: ratingData.courseId });
  
  if (rating) {
    rating.rating = ratingData.rating;
    await rating.save();
  } else {
    rating = await Rating.create({
      ...ratingData,
      userId
    });
    await rating.populate('userId', 'name');
  }

  return rating;
};

const getRatings = async (filters) => {
  const { courseId } = filters;
  let query = {};

  if (courseId) query.courseId = courseId;

  const ratings = await Rating.find(query)
    .populate('userId', 'name')
    .populate('courseId', 'title');

  const avgRating = ratings.length > 0 
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
    : 0;

  return {
    count: ratings.length,
    average: parseFloat(avgRating.toFixed(1)),
    data: ratings
  };
};

module.exports = { createOrUpdateRating, getRatings };