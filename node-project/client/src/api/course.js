import api from './axios';

export const getCourses = async (params = {}) => {
  const response = await api.get('/courses', { params });
  return response.data;
};

export const getCourse = async (id) => {
  const response = await api.get('/courses', { params: { id } });
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put('/courses', courseData, { params: { id } });
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete('/courses', { params: { id } });
  return response.data;
};