import api from './axios';

export const getChapters = async (courseId) => {
  const response = await api.get('/chapters', { params: { courseId } });
  return response.data;
};

export const createChapter = async (chapterData) => {
  const response = await api.post('/chapters', chapterData);
  return response.data;
};

export const updateChapter = async (id, chapterData) => {
  const response = await api.put('/chapters', chapterData, { params: { id } });
  return response.data;
};

export const deleteChapter = async (id) => {
  const response = await api.delete('/chapters', { params: { id } });
  return response.data;
};
