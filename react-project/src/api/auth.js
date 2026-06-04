import api from './axios';
import Cookies from 'js-cookie';

export const register = async (userData) => {
  // Check if email already exists
  const existingUsers = await api.get('/users', {
    params: {
      email: userData.email
    }
  });

  if (existingUsers.data && existingUsers.data.length > 0) {
    const error = new Error('Email already registered');
    error.response = { data: { message: 'Email already registered' } };
    throw error;
  }

  const response = await api.post('/users', { ...userData, role: 'User' });
  const user = response.data;
  Cookies.set('accessToken', 'mock-token', { expires: 7 });
  setCurrentUser(user);
  return { data: user };
};

export const login = async (credentials) => {
  // Search for user by email and password in json-server
  const response = await api.get('/users', {
    params: {
      email: credentials.email,
      password: credentials.password
    }
  });

  const user = response.data[0];
  if (user) {
    Cookies.set('accessToken', 'mock-token', { expires: 7 });
    setCurrentUser(user);
    return { data: user };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const fetchUserMe = async () => {
  const user = getCurrentUser();
  if (user) return { data: user };
  throw new Error('Not authenticated');
};

export const logout = async () => {
  Cookies.remove('accessToken');
  clearCurrentUser();
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

export const checkAuth = () => {
  return !!Cookies.get('accessToken');
};