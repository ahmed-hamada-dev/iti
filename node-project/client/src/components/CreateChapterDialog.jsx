import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateChapter, useUpdateChapter } from '../hooks/useChapters';

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
import { Button } from './ui/button';

const chapterSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
});

export function CreateChapterDialog({ children, courseId, initialData }) {
  const [open, setOpen] = useState(false);
  const createChapterMutation = useCreateChapter();
  const updateChapterMutation = useUpdateChapter();

  const isEditing = !!initialData;

  const form = useForm({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: initialData?.title || '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
      });
    }
  }, [initialData, form]);

  const onSubmit = (data) => {
    const payload = isEditing 
      ? { id: initialData._id, data } 
      : { ...data, courseId };

    const mutation = isEditing ? updateChapterMutation : createChapterMutation;

    mutation.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        if (!isEditing) form.reset();
      },
      onError: (err) => {
        form.setError('root', {
          type: 'manual',
          message: err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} chapter`,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Chapter' : 'Create New Chapter'}</DialogTitle>
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
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Getting Started" {...field} />
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
                disabled={isEditing ? updateChapterMutation.isPending : createChapterMutation.isPending}
              >
                {isEditing
                  ? (updateChapterMutation.isPending ? 'Saving...' : 'Save Changes')
                  : (createChapterMutation.isPending ? 'Creating...' : 'Create Chapter')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
