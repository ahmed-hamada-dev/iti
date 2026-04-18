import api from './axios';

export const getComments = async (lessonId) => {
  const response = await api.get('/comments', { params: { lessonId } });
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await api.post('/comments', commentData);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete('/comments', { params: { id } });
  return response.data;
};