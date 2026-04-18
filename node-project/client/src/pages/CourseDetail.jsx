import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourse } from '../hooks/useCourses';
import { useChapters } from '../hooks/useChapters';
import { useLessons } from '../hooks/useLessons';
import { useEnrollments, useEnroll } from '../hooks/useEnrollments';
import { useAuth } from '../hooks/useAuth';
import { useRatings, useCreateRating } from '../hooks/useRatings';
import { Star } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: courseData, isLoading: courseLoading } = useCourse(id);
  const { data: chaptersData, isLoading: chaptersLoading } = useChapters(id);
  const { data: lessonsData, isLoading: lessonsLoading } = useLessons(id);

  const { data: enrollmentsData } = useEnrollments(user?._id);
  const enrollMutation = useEnroll();

  const { data: ratingsData } = useRatings(id);
  const ratingMutation = useCreateRating();
  const [rating, setRating] = useState(0);

  const course = courseData?.data?.[0];
  const chapters = chaptersData?.data || [];
  const lessons = lessonsData?.data || [];
  const enrollments = enrollmentsData?.data || [];
  const ratings = ratingsData?.data || [];

  useEffect(() => {
    if (ratings.length > 0 && user) {
      const userRating = ratings.find(r =>
        (r.userId && r.userId._id === user._id) ||
        r.userId === user._id
      );
      if (userRating) {
        setRating(userRating.rating);
      }
    }
  }, [ratings, user]);

  const isEnrolled = enrollments.some(e => e.courseId?._id === id);
  const isOwner = course?.instructorId?._id === user?._id;

  const avgRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 'N/A';

  const handleEnroll = () => {
    if (isOwner) {
      alert("You cannot enroll in your own course");
      return;
    }
    enrollMutation.mutate(id, {
      onSuccess: () => navigate('/dashboard'),
      onError: (err) => alert(err.response?.data?.message || 'Failed to enroll')
    });
  };

  const handleRating = (value) => {
    setRating(value);
    ratingMutation.mutate({ courseId: id, rating: value }, {
      onSuccess: () => { },
      onError: (err) => alert(err.response?.data?.message || 'Failed to submit rating'),
    });
  };

  if (courseLoading || chaptersLoading || lessonsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Course not found</p>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to courses</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-16 px-6 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1 text-sm font-medium bg-indigo-500/20 text-indigo-400 rounded-full">
                  {course.category}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-white font-medium">{avgRating}</span>
                  <span className="text-slate-400 text-sm">({ratings.length} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {course.title}
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-2xl">
                {course.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {course.instructorId?.name?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Instructor</p>
                  <p className="text-white font-medium">{course.instructorId?.name}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                {user && user.role === 'Student' && !isEnrolled && !isOwner && (
                  <button
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                    className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now - Free'}
                  </button>
                )}

                {isEnrolled && (
                  <div className="py-4">
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">You're Enrolled</span>
                    </div>
                    <Link
                      to={`/courses/${id}/learn`}
                      className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-center rounded-xl transition-colors"
                    >
                      Continue Learning
                    </Link>
                  </div>
                )}

                {isOwner && (
                  <div className="py-4">
                    <p className="text-slate-400 text-sm mb-4">This is your course</p>
                    <Link
                      to={`/courses/${id}/learn`}
                      className="block w-full py-3 bg-slate-600 hover:bg-slate-500 text-white font-medium text-center rounded-xl transition-colors"
                    >
                      View Student Player
                    </Link>
                  </div>
                )}

                {!user && (
                  <Link
                    to="/login"
                    className="block w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-bold rounded-xl text-center transition-colors"
                  >
                    Login to Enroll
                  </Link>
                )}

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-slate-400 text-sm mb-3">Rate this course</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        disabled={ratingMutation.isPending || !isEnrolled}
                        className="text-2xl transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {star <= rating ? <Star className='text-orange-400 fill-orange-400' /> : <Star className='' />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Course Content</h2>
            <div className="hidden md:flex text-sm text-slate-500 space-x-2">
              <span>{chapters.length} sections</span>
              <span>•</span>
              <span>{lessons.length} lessons</span>
            </div>
          </div>

          {chapters.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <p className="text-slate-500 font-medium">No content published yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chapters.map((chapter, index) => {
                const chapterLessons = lessons.filter(l => l.chapterId === chapter._id);
                return (
                  <div key={chapter._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-lg">
                        Section {index + 1}: {chapter.title}
                      </h3>
                      <span className="text-xs font-medium bg-slate-200 text-slate-600 px-3 py-1 rounded-full shrink-0">
                        {chapterLessons.length} lessons
                      </span>
                    </div>
                    <div>
                      {chapterLessons.length === 0 ? (
                        <div className="px-6 py-4 text-sm text-slate-400 italic">No lessons assigned...</div>
                      ) : (
                        <div className="divide-y divide-slate-100">
                          {chapterLessons.map((lesson, lessonIdx) => (
                            <div key={lesson._id} className={`p-4 sm:px-6 flex items-start sm:items-center justify-between gap-4 transition-colors ${isEnrolled || isOwner ? 'hover:bg-slate-50 cursor-pointer' : 'opacity-70'}`}>
                              <div className="flex items-start sm:items-center gap-4 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isEnrolled || isOwner ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
                                  <span className="text-sm font-medium">{lessonIdx + 1}</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-slate-800">{lesson.title}</h4>
                                  {lesson.content && (
                                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{lesson.content.substring(0, 60)}...</p>
                                  )}
                                </div>
                              </div>
                              <div className="shrink-0 flex items-center">
                                {(isEnrolled || isOwner) ? (
                                  <Link
                                    to={`/courses/${id}/learn/${lesson._id}`}
                                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-200"
                                  >
                                    Watch
                                  </Link>
                                ) : (
                                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;