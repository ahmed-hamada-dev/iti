import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProgress as getProgressAPI, updateProgress as updateProgressAPI } from '../api/progress';

export const useProgress = (lessonId) => {
  return useQuery({
    queryKey: ['progress', lessonId],
    queryFn: () => getProgressAPI(null, lessonId),
    enabled: !!lessonId,
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProgressAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['progress', variables.lessonId] });
    },
  });
};