import api from './axios';
import Cookies from 'js-cookie';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data?.data) {
    Cookies.set('accessToken', response.data.data.accessToken, { expires: 15 / (24 * 60) });
    Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 7 });
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data?.data) {
    Cookies.set('accessToken', response.data.data.accessToken, { expires: 15 / (24 * 60) });
    Cookies.set('refreshToken', response.data.data.refreshToken, { expires: 7 });
  }
  return response.data;
};

export const fetchUserMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post('/auth/refresh');
  if (response.data.data) {
    const { accessToken } = response.data.data;
    return accessToken;
  }
  return null;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.log('Logout error:', error);
  }
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getCurrentUser = () => {
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  Cookies.set('user', JSON.stringify(user), { expires: 7 });
};

export const clearCurrentUser = () => {
  Cookies.remove('user');
};

export const hasAccessToken = () => {
  return !!Cookies.get('accessToken');
};

export const checkAuth = hasAccessToken;