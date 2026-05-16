import api from './axios';

export const getAds = async (params = {}) => {
    const response = await api.get('/ads', { params });
    return response.data;
};

export const getAd = async (id) => {
    const response = await api.get(`/ads/${id}`);
    return response.data;
};
