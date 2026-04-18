import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCourse, useUpdateCourse } from '../hooks/useCourses';

const CATEGORIES = [
  { value: 'Programming', label: 'Programming' },
  { value: 'Design', label: 'Design' },
  { value: 'Business', label: 'Business' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'General', label: 'General' }
];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: courseData, isLoading } = useCourse(id);
  const updateCourseMutation = useUpdateCourse();
  const [formData, setFormData] = useState({ title: '', description: '', category: 'General' });
  const [error, setError] = useState('');

  const course = courseData?.data?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!formData.title && course) {
    setFormData({ title: course.title, description: course.description, category: course.category });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    updateCourseMutation.mutate(
      { id, data: formData },
      {
        onSuccess: () => navigate('/instructor/courses'),
        onError: (err) => setError(err.response?.data?.message || 'Failed to update course'),
      }
    );
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        <div className="relative max-w-3xl mx-auto">
          <Link to="/instructor/courses" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Courses
          </Link>
          
          <h1 className="text-4xl font-bold text-white">Edit Course</h1>
          <p className="text-slate-400 mt-2">Update your course details</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Complete JavaScript Mastery"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what students will learn..."
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                disabled={updateCourseMutation.isPending}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                {updateCourseMutation.isPending ? 'Updating...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/instructor/courses')}
                className="px-8 py-3 border border-slate-300 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditCourse;