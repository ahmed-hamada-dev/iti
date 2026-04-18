import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRatings as getRatingsAPI, createRating as createRatingAPI } from '../api/rating';

export const useRatings = (courseId) => {
  return useQuery({
    queryKey: ['ratings', courseId],
    queryFn: () => getRatingsAPI(courseId),
    enabled: !!courseId,
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRatingAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.courseId] });
    },
  });
};