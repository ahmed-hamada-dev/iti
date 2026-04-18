import { useState } from 'react';
import { useDeleteCourse } from '../hooks/useCourses';
import { CreateCourseDialog } from './CreateCourseDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function CourseContextMenu({ course }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const deleteMutation = useDeleteCourse();
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    deleteMutation.mutate(course._id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
      onError: (err) => alert(err.response?.data?.message || 'Failed to delete course'),
    });
  };

  return (
    <div onClick={(e) => e.preventDefault()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer outline-none"
            aria-label="Course Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl">
          <DropdownMenuItem 
            className="cursor-pointer py-2.5 px-3"
            onClick={() => navigate(`/dashboard/courses/${course._id}`)}
          >
            <Eye className="w-4 h-4 mr-2 text-blue-600" />
            <span className="font-medium text-slate-700">Manage Chapters</span>
          </DropdownMenuItem>

          <CreateCourseDialog initialData={course}>
            <DropdownMenuItem 
              className="cursor-pointer py-2.5 px-3"
              onSelect={(e) => e.preventDefault()}
            >
              <Edit className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="font-medium text-slate-700">Edit Course</span>
            </DropdownMenuItem>
          </CreateCourseDialog>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem 
            className="cursor-pointer py-2.5 px-3 text-red-600 focus:bg-red-50 focus:text-red-700 hover:bg-red-50"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="font-medium">Delete Course</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        description={`Are you sure you want to delete "${course.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
