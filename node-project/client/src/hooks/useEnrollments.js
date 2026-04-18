import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollInCourse as enrollAPI, getEnrollments as getEnrollmentsAPI } from '../api/enrollment';

export const useEnrollments = (userId) => {
  return useQuery({
    queryKey: ['enrollments', userId],
    queryFn: () => getEnrollmentsAPI(userId),
    enabled: !!userId,
  });
};

export const useEnroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};