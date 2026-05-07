import api from './axios';

export const getOrders = async (params = {}) => {
  const response = await api.get('/orders', { params });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async ({ id, status }) => {
  const response = await api.patch(`/orders/${id}`, { status });
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', {
    ...orderData,
    createdAt: new Date().toISOString(),
  });
  return response.data;
};
