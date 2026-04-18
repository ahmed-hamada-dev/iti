import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourse } from '../hooks/useCourses';
import { useChapters } from '../hooks/useChapters';
import { useLessons } from '../hooks/useLessons';
import { useComments, useCreateComment, useDeleteComment } from '../hooks/useComments';
import { useAuth } from '../hooks/useAuth';
import CommentSection from '../components/CommentSection';

const CoursePlayer = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  const { data: courseData, isLoading: courseLoading } = useCourse(id);
  const { data: chaptersData, isLoading: chaptersLoading } = useChapters(id);
  const { data: lessonsData, isLoading: lessonsLoading } = useLessons(id);

  const { user } = useAuth();
  const createCommentMutation = useCreateComment();
  const deleteCommentMutation = useDeleteComment();

  const course = courseData?.data;
  const chapters = chaptersData?.data || [];
  const lessons = lessonsData?.data || [];

  const [activeChapterId, setActiveChapterId] = useState(null);

  // Derive the active lesson based on URL Param, otherwise fallback to the very first lesson
  const activeLesson = useMemo(() => {
    if (lessonId && lessons.length > 0) {
      return lessons.find(l => l._id === lessonId);
    }
    if (!lessonId && lessons.length > 0) {
      return lessons[0];
    }
    return null;
  }, [lessonId, lessons]);

  const { data: commentsData } = useComments(activeLesson?._id);
  const comments = commentsData?.data || [];

  const handleAddComment = (commentText, clearCommentText) => {
    if (!activeLesson) return;
    createCommentMutation.mutate(
      { lessonId: activeLesson._id, content: commentText },
      {
        onSuccess: clearCommentText,
        onError: (err) => alert(err.response?.data?.message || 'Failed to add comment'),
      }
    );
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentMutation.mutate(commentId);
  };

  // Keep sidebar accordion open for the active chapter
  useEffect(() => {
    if (activeLesson) {
      setActiveChapterId(activeLesson.chapterId);
      // Auto-navigate to URL if not set
      if (!lessonId) {
        navigate(`/courses/${id}/learn/${activeLesson._id}`, { replace: true });
      }
    }
  }, [activeLesson, id, lessonId, navigate]);

  // Pagination Logic (Next / Prev)
  const [prevLesson, nextLesson] = useMemo(() => {
    if (!activeLesson || lessons.length === 0) return [null, null];
    // Flatten lessons sorted by chapters then strictly by lesson.order (assume lessons are returned sorted)
    // Here we sort them manually just to be safe
    const sortedLessons = [...lessons].sort((a, b) => {
      const chapterA = chapters.findIndex(c => c._id === a.chapterId);
      const chapterB = chapters.findIndex(c => c._id === b.chapterId);
      if (chapterA !== chapterB) return chapterA - chapterB;
      return a.order - b.order;
    });

    const currentIndex = sortedLessons.findIndex(l => l._id === activeLesson._id);
    const p = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
    const n = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

    return [p, n];
  }, [activeLesson, lessons, chapters]);


  if (courseLoading || chaptersLoading || lessonsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading course player...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 flex flex-col items-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Course not found</h2>
        <Link to="/dashboard" className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navigation Navbar */}
      <header className="h-16 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0 z-10 transition-all shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline font-medium">Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block" />
          <h1 className="font-bold text-lg truncate max-w-[300px] md:max-w-[500px]" title={course.title}>
            {course.title}
          </h1>
        </div>
        <div className="text-sm font-medium text-slate-300">
          Course Player
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar - Curriculum */}
        <aside className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto  md:flex">
          <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
            <h2 className="font-bold text-slate-800 text-lg">Course Content</h2>
            <p className="text-sm text-slate-500 mt-1">{chapters.length} sections • {lessons.length} lessons</p>
          </div>

          {chapters.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              No content published yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {chapters.map((chapter, index) => {
                const chapterLessons = lessons.filter(l => l.chapterId === chapter._id);
                const isOpen = activeChapterId === chapter._id;

                return (
                  <div key={chapter._id} className="bg-white">
                    <button
                      onClick={() => setActiveChapterId(isOpen ? null : chapter._id)}
                      className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex flex-col pr-4">
                        <span className="text-sm font-bold text-slate-800 line-clamp-2">
                          Section {index + 1}: {chapter.title}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">
                          {chapterLessons.length} lessons
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-slate-400 transform transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="bg-slate-50 pb-2">
                        {chapterLessons.length === 0 ? (
                          <div className="px-5 py-3 text-xs text-slate-500 italic">Empty section</div>
                        ) : (
                          chapterLessons.map((lesson, lessonIndex) => {
                            const isSelected = activeLesson?._id === lesson._id;
                            return (
                              <Link
                                key={lesson._id}
                                to={`/courses/${id}/learn/${lesson._id}`}
                                className={`group flex items-start gap-3 px-5 py-3 transition-colors cursor-pointer border-l-4 ${isSelected
                                    ? 'bg-indigo-50 border-indigo-500'
                                    : 'border-transparent hover:bg-slate-100'
                                  }`}
                              >
                                <div className="shrink-0 mt-0.5">
                                  {lesson.videoUrl ? (
                                    <svg className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  )}
                                </div>
                                <span className={`text-sm line-clamp-2 leading-snug ${isSelected ? 'font-bold text-indigo-900' : 'font-medium text-slate-700 group-hover:text-slate-900'}`}>
                                  {lessonIndex + 1}. {lesson.title}
                                </span>
                              </Link>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 overflow-y-auto bg-white flex flex-col relative">

          {/* Mobile Curriculum Toggle */}
          <div className="md:hidden p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2 text-sm text-slate-600 font-medium">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Course content below (Scroll down on mobile)
          </div>

          {!activeLesson ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No lesson selected</h3>
              <p className="max-w-md">Select a lesson from the curriculum sidebar to start learning.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col max-w-[1200px] w-full mx-auto">

              {/* Media Player */}
              {activeLesson.videoUrl ? (
                <div className="w-full bg-slate-900 border-b border-slate-200 aspect-video relative flex items-center justify-center group overflow-hidden">
                  {/* Fallback to simple anchor if standard iframe block fails, but for UI mockup this provides the layout */}
                  {activeLesson.videoUrl.includes('youtube.com') || activeLesson.videoUrl.includes('youtu.be') ? (
                    <iframe
                      className="absolute inset-0 w-full h-full shadow-lg"
                      src={`https://www.youtube.com/embed/${activeLesson.videoUrl.split('v=')[1]?.split('&')[0] || activeLesson.videoUrl.split('/').pop()}?rel=0`}
                      title={activeLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center p-6 text-slate-300">
                      <svg className="w-16 h-16 text-slate-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <p className="mb-4">External video provider</p>
                      <a href={activeLesson.videoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-indigo-500 hover:text-slate-900 font-medium rounded-lg transition-colors inline-block text-white">
                        Open Video
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-0 md:h-12 bg-slate-50 border-b border-slate-200" />
              )}

              {/* Lesson Metadata */}
              <div className="px-6 py-8 md:px-12 flex-1">
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 font-serif tracking-tight">{activeLesson.title}</h1>
                <div className="prose prose-slate prose-lg max-w-none text-slate-700 min-h-[300px] mb-12">
                  {/* Simplistic rendering of content. Can use react-markdown if needed later. */}
                  {activeLesson.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                {/* Comment Section */}
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <CommentSection
                    user={user}
                    comments={comments}
                    onCreateComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    isCreating={createCommentMutation.isPending}
                    isDeleting={deleteCommentMutation.isPending}
                  />
                </div>
              </div>

              {/* Foot Navigation Bar */}
              <div className="border-t border-slate-200 bg-white px-6 py-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {prevLesson ? (
                  <Link
                    to={`/courses/${id}/learn/${prevLesson._id}`}
                    className="w-full sm:w-auto px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Lesson
                  </Link>
                ) : (
                  <div className="w-full sm:w-auto px-6 py-3 border border-slate-100 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    First Lesson
                  </div>
                )}

                {nextLesson ? (
                  <Link
                    to={`/courses/${id}/learn/${nextLesson._id}`}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-500 text-slate-900 hover:bg-indigo-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm hover:shadow-md"
                  >
                    Next Lesson
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div className="w-full sm:w-auto px-6 py-3 bg-teal-50 border border-teal-200 text-teal-700 font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm text-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Course Completed
                  </div>
                )}
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursePlayer;
