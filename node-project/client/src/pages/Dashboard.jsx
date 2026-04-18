import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useInstructorCourses } from '../hooks/useCourses';
import { useEnrollments } from '../hooks/useEnrollments';
import { CreateCourseDialog } from '../components/CreateCourseDialog';
import { CourseContextMenu } from '../components/CourseContextMenu';
import { CourseCard } from '../components/CourseCard';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { data: coursesData } = useInstructorCourses(user?._id);
  const { data: enrollmentsData } = useEnrollments(user?._id);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const instructorCourses = coursesData?.data || [];
  const enrollments = enrollmentsData?.data || [];

  return (
    <div className="min-h-screen">
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Welcome back</p>
              <h1 className="text-4xl font-bold text-white">{user.name}!</h1>
              <span className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${user.role === 'Instructor'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {user.role === 'Instructor' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Instructor Dashboard</h2>
                <CreateCourseDialog>
                  <button
                    className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-500  hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Course
                  </button>
                </CreateCourseDialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Total Courses</p>
                      <p className="text-2xl font-bold text-slate-800">{instructorCourses.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354v4.512c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V7.385c0-1.136-.847-2.109-1.976-2.192l-.352-.315H7.124a1.125 1.125 0 00-.976 1.192l-.352.315H4.125A1.125 1.125 0 003 9.75v9.75A1.125 1.125 0 004.125 21h9.75A1.125 1.125 0 0015 19.875v-9.75c0-.621-.504-1.125-1.125-1.125h-9.75l-.352.315a2.996 2.996 0 01-1.976-.192z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Total Lessons</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {instructorCourses.reduce((sum, c) => sum + (c.lessonsCount || 0), 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H3v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Students</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {enrollments.filter(e => instructorCourses.some(c => c._id === e.courseId?._id)).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-6">Your Courses</h3>
              {instructorCourses.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200">
                  <p className="text-slate-500 mb-4">You haven't created any courses yet</p>
                  <CreateCourseDialog>
                    <button
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                    >
                      Create your first course →
                    </button>
                  </CreateCourseDialog>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructorCourses.slice(0, 3).map((course, index) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      variant="instructor"
                      index={index}
                      instructorLinkText="Preview Course →"
                      instructorLinkHref={`/courses/${course._id}`}
                    />
                  ))}
                  {instructorCourses.length > 3 && (
                    <Link to="/instructor/courses" className="group block">
                      <article className="h-full flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-400 transition-colors">
                        <div className="text-center">
                          <span className="text-3xl text-slate-300 group-hover:text-indigo-400">+{instructorCourses.length - 3}</span>
                          <p className="text-slate-500 text-sm mt-2">View all courses</p>
                        </div>
                      </article>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}

          {user.role === 'Student' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Student Dashboard</h2>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-medium rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Courses
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Enrolled Courses</p>
                      <p className="text-2xl font-bold text-slate-800">{enrollments.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.241-.076 3.48 3.48 0 012.108-2.432 3.42 3.42 0 012.176.121 3.48 3.48 0 002.441 1.832 3.42 3.42 0 012.172-.121 3.48 3.48 0 012.108 2.432 3.42 3.42 0 001.241.076 3.48 3.48 0 012.435-1.32 3.48 3.48 0 012.426.188 3.42 3.42 0 011.241-.076 3.48 3.48 0 012.108 2.432 3.42 3.42 0 002.176.121v.054a3.48 3.48 0 01-1.32 2.435 3.48 3.48 0 01-2.426-.188 3.42 3.42 0 01-1.241.076 3.48 3.48 0 01-2.108-2.432 3.42 3.42 0 00-2.176-.121 3.48 3.48 0 01-2.441-1.832 3.42 3.42 0 00-2.176.121 3.48 3.48 0 01-2.108 2.432 3.42 3.42 0 00-1.241-.076 3.48 3.48 0 01-2.435 1.32 3.48 3.48 0 01-2.426-.188 3.42 3.42 0 01-1.241.076v-.054a3.42 3.42 0 001.241-.076 3.48 3.48 0 012.108-2.432 3.42 3.42 0 00-2.176-.121 3.48 3.48 0 01-2.441-1.832z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Lessons Completed</p>
                      <p className="text-2xl font-bold text-slate-800">0</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Certificates</p>
                      <p className="text-2xl font-bold text-slate-800">0</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-6">My Enrolled Courses</h3>
              {enrollments.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200">
                  <p className="text-slate-500 mb-4">You haven't enrolled in any courses yet</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Browse courses →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrollments.slice(0, 3).map((enrollment, index) => (
                    <CourseCard
                      key={enrollment._id}
                      enrollment={enrollment}
                      variant="enrolled"
                      index={index}
                    />
                  ))}
                  {enrollments.length > 3 && (
                    <Link to="/my-enrollments" className="group block">
                      <article className="h-full flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-400 transition-colors">
                        <div className="text-center">
                          <span className="text-3xl text-slate-300 group-hover:text-emerald-400">+{enrollments.length - 3}</span>
                          <p className="text-slate-500 text-sm mt-2">View all enrollments</p>
                        </div>
                      </article>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;