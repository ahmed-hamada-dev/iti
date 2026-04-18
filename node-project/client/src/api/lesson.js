import api from './axios';

export const getLessons = async (courseId) => {
  const response = await api.get('/lessons', { params: { courseId } });
  return response.data;
};

export const createLesson = async (lessonData) => {
  const response = await api.post('/lessons', lessonData);
  return response.data;
};

export const updateLesson = async (id, lessonData) => {
  const response = await api.put('/lessons', lessonData, { params: { id } });
  return response.data;
};

export const deleteLesson = async (id) => {
  const response = await api.delete('/lessons', { params: { id } });
  return response.data;
};