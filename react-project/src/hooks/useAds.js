import { useQuery } from '@tanstack/react-query';
import { getAds, getAd } from '../api/ads';

export const useAds = (params = {}) => {
    return useQuery({
        queryKey: ['ads', params],
        queryFn: () => getAds(params),
    });
};

export const useAd = (id) => {
    return useQuery({
        queryKey: ['ad', id],
        queryFn: () => getAd(id),
        enabled: !!id,
    });
};
