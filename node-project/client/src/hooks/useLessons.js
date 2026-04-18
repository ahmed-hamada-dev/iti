import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLessons as getLessonsAPI, createLesson as createLessonAPI, updateLesson as updateLessonAPI, deleteLesson as deleteLessonAPI } from '../api/lesson';

export const useLessons = (courseId) => {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => getLessonsAPI(courseId),
    enabled: !!courseId,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLessonAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lessons', variables.courseId] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateLessonAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLessonAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};