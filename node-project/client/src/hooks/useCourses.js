import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourses as getCoursesAPI, getCourse as getCourseAPI, createCourse as createCourseAPI, updateCourse as updateCourseAPI, deleteCourse as deleteCourseAPI } from '../api/course';

export const useCourses = (params = {}) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => getCoursesAPI(params),
  });
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseAPI(id),
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourseAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCourseAPI(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
      queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourseAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
    },
  });
};

export const useInstructorCourses = (instructorId) => {
  return useQuery({
    queryKey: ['instructorCourses', instructorId],
    queryFn: () => getCoursesAPI({ instructorId }),
    enabled: !!instructorId,
  });
};