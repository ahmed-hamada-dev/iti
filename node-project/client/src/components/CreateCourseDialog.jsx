import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateCourse, useUpdateCourse } from '../hooks/useCourses';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const CATEGORIES = [
  { value: 'Programming', label: 'Programming' },
  { value: 'Design', label: 'Design' },
  { value: 'Business', label: 'Business' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'General', label: 'General' },
];

const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL' }).or(z.literal('')).optional(),
});

export function CreateCourseDialog({ children, initialData }) {
  const [open, setOpen] = useState(false);
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();

  const isEditing = !!initialData;

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || 'General',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'General',
        imageUrl: initialData.imageUrl || '',
      });
    }
  }, [initialData, form]);

  const onSubmit = (data) => {
    // Determine the active mutation and its payload
    const mutation = isEditing ? updateCourseMutation : createCourseMutation;
    const payload = isEditing ? { id: initialData._id, data } : data;

    mutation.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        if (!isEditing) form.reset();
      },
      onError: (err) => {
        form.setError('root', {
          type: 'manual',
          message: err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} course`,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Course' : 'Create New Course'}</DialogTitle>
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
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Complete JavaScript Mastery" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Cover Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what students will learn..."
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                disabled={isEditing ? updateCourseMutation.isPending : createCourseMutation.isPending}
              >
                {isEditing
                  ? (updateCourseMutation.isPending ? 'Saving...' : 'Save Changes')
                  : (createCourseMutation.isPending ? 'Creating...' : 'Create Course')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
