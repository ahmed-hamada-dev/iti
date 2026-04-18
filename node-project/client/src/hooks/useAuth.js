import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { register as registerAPI, login as loginAPI, logout as logoutAPI } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerAPI,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutAPI,
  });
};