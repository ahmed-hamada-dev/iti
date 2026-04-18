import api from './axios';

export const enrollInCourse = async (courseId) => {
  const response = await api.post('/enrollments', { courseId });
  return response.data;
};

export const getEnrollments = async (userId) => {
  const response = await api.get('/enrollments', { params: { userId } });
  return response.data;
};