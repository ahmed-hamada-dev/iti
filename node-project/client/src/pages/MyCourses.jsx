import { Link } from 'react-router-dom';
import { useInstructorCourses, useDeleteCourse } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import { CreateCourseDialog } from '../components/CreateCourseDialog';
import { CourseCard } from '../components/CourseCard';

const MyCourses = () => {
  const { user } = useAuth();
  const { data, isLoading } = useInstructorCourses(user._id);

  const courses = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-white">My Courses</h1>
              <p className="text-slate-400 mt-2">Manage your created courses</p>
            </div>
            <CreateCourseDialog>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Course
              </button>
            </CreateCourseDialog>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {courses.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-16 text-center border border-slate-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No courses yet</h3>
              <p className="text-slate-500 mb-6">Start sharing your knowledge with the world</p>
              <CreateCourseDialog>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Create your first course
                </button>
              </CreateCourseDialog>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-slate-500">{courses.length} course{courses.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    variant="instructor"
                    index={index}
                    instructorLinkText="Manage Chapters & Lessons →"
                    instructorLinkHref={`/dashboard/courses/${course._id}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyCourses;