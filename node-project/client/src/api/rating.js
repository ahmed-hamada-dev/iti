import api from './axios';

export const getRatings = async (courseId) => {
  const response = await api.get('/ratings', { params: { courseId } });
  return response.data;
};

export const createRating = async (ratingData) => {
  const response = await api.post('/ratings', ratingData);
  return response.data;
};