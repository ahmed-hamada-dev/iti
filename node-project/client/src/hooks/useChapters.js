import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChapters as getChaptersAPI, createChapter as createChapterAPI, updateChapter as updateChapterAPI, deleteChapter as deleteChapterAPI } from '../api/chapter';

export const useChapters = (courseId) => {
  return useQuery({
    queryKey: ['chapters', courseId],
    queryFn: () => getChaptersAPI(courseId),
    enabled: !!courseId,
  });
};

export const useCreateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChapterAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', variables.courseId] });
    },
  });
};

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateChapterAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] });
    },
  });
};

export const useDeleteChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChapterAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] });
    },
  });
};
