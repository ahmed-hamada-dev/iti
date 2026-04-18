import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateLesson, useUpdateLesson } from '../hooks/useLessons';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const lessonSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' }),
  videoUrl: z.string().url({ message: 'Please enter a valid URL' }).or(z.literal('')).optional(),
});

export function CreateLessonDialog({ children, courseId, chapterId, initialData }) {
  const [open, setOpen] = useState(false);
  const createLessonMutation = useCreateLesson();
  const updateLessonMutation = useUpdateLesson();

  const isEditing = !!initialData;

  const form = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      videoUrl: initialData?.videoUrl || '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
        content: initialData.content || '',
        videoUrl: initialData.videoUrl || '',
      });
    }
  }, [initialData, form]);

  const onSubmit = (data) => {
    const payload = isEditing 
      ? { id: initialData._id, data: { ...data, courseId, chapterId } } 
      : { ...data, courseId, chapterId };

    const mutation = isEditing ? updateLessonMutation : createLessonMutation;

    mutation.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        if (!isEditing) form.reset();
      },
      onError: (err) => {
        form.setError('root', {
          type: 'manual',
          message: err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} lesson`,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Lesson' : 'Create New Lesson'}</DialogTitle>
        </DialogHeader>

        {form.formState.errors.root && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {form.formState.errors.root.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Introduction to Variables" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Content </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your lesson content here..."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-slate-900 border-0 cursor-pointer"
                disabled={isEditing ? updateLessonMutation.isPending : createLessonMutation.isPending}
              >
                {isEditing
                  ? (updateLessonMutation.isPending ? 'Saving...' : 'Save Changes')
                  : (createLessonMutation.isPending ? 'Creating...' : 'Create Lesson')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
