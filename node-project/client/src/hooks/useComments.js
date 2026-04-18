import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments as getCommentsAPI, createComment as createCommentAPI, deleteComment as deleteCommentAPI } from '../api/comment';

export const useComments = (lessonId) => {
  return useQuery({
    queryKey: ['comments', lessonId],
    queryFn: () => getCommentsAPI(lessonId),
    enabled: !!lessonId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCommentAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.lessonId] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};