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
  const products = await Promise.all(
    orderData.items.map(async (item) => {
      const response = await api.get(`/products/${item.id}`);
      return response.data;
    })
  );
  const productsById = new Map(products.map(product => [String(product.id), product]));

  const insufficientItem = orderData.items.find((item) => {
    const product = productsById.get(String(item.id));
    return !product || Number(product.stock) < Number(item.quantity);
  });

  if (insufficientItem) {
    const product = productsById.get(String(insufficientItem.id));
    const error = new Error('Insufficient stock');
    error.response = {
      data: {
        code: 'INSUFFICIENT_STOCK',
        productName: product?.name || insufficientItem.name,
        availableStock: Number(product?.stock || 0),
      },
    };
    throw error;
  }

  const response = await api.post('/orders', {
    ...orderData,
    createdAt: new Date().toISOString(),
  });

  await Promise.all(
    orderData.items.map((item) => {
      const product = productsById.get(String(item.id));
      const nextStock = Math.max(Number(product.stock) - Number(item.quantity), 0);
      return api.patch(`/products/${item.id}`, { stock: nextStock });
    })
  );

  return response.data;
};
