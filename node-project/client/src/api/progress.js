import api from './axios';

export const getProgress = async (userId, lessonId) => {
  const response = await api.get('/progress', { params: { userId, lessonId } });
  return response.data;
};

export const updateProgress = async (progressData) => {
  const response = await api.post('/progress', progressData);
  return response.data;
};