import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourse } from '../hooks/useCourses';
import { useLessons, useDeleteLesson } from '../hooks/useLessons';
import { useChapters, useDeleteChapter } from '../hooks/useChapters';
import { CreateCourseDialog } from '../components/CreateCourseDialog';
import { CreateLessonDialog } from '../components/CreateLessonDialog';
import { CreateChapterDialog } from '../components/CreateChapterDialog';
import { ConfirmDialog } from '../components/ConfirmDialog';

const ManageCourse = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useCourse(id);
  const { data: lessonsData, isLoading: lessonsLoading } = useLessons(id);
  const { data: chaptersData, isLoading: chaptersLoading } = useChapters(id);

  const deleteLessonMutation = useDeleteLesson();
  const deleteChapterMutation = useDeleteChapter();

  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [chapterToDelete, setChapterToDelete] = useState(null);

  const course = data?.data;
  const lessons = lessonsData?.data || [];
  const chapters = chaptersData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Course not found</h2>
        <Link to="/instructor/courses" className="text-indigo-600 hover:underline">
          Return to Your Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link to="/instructor/courses" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courses
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">

              <span className="text-sm text-slate-500">Course Management</span>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{course.title}</h1>
              <p className="text-slate-600 max-w-2xl">{course.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <CreateCourseDialog initialData={course}>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium rounded-lg transition-colors cursor-pointer">
                  Edit Details
                </button>
              </CreateCourseDialog>

            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Course Curriculum</h2>
          <CreateChapterDialog courseId={id}>
            <button className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 font-medium rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Chapter
            </button>
          </CreateChapterDialog>
        </div>

        {chaptersLoading || lessonsLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : chapters.length === 0 ? (
          <div className="bg-white border text-center border-slate-200 rounded-2xl p-12 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6 shadow-sm border border-indigo-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No chapters yet</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Your course is beautifully empty! Start organizing your curriculum by creating chapters, then add rich media lessons and reading materials to them.
              </p>
              <CreateChapterDialog courseId={id}>
                <button className="px-6 py-3 bg-indigo-500 text-slate-900 hover:bg-indigo-600 font-bold rounded-xl transition-colors w-full md:w-auto inline-flex items-center justify-center gap-2 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create First Chapter
                </button>
              </CreateChapterDialog>
            </div>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-slate-50 rounded-full opacity-50 border border-slate-100 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-slate-50 rounded-full opacity-50 border border-slate-100 -translate-x-1/3 translate-y-1/3" />
          </div>
        ) : (
          <div className="space-y-6">
            {chapters.map((chapter, chapterIndex) => {
              const chapterLessons = lessons.filter(l => l.chapterId === chapter._id);

              return (
                <div key={chapter._id} className="bg-white border text-center border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                  <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-800 text-lg">Section {chapterIndex + 1}: {chapter.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreateChapterDialog courseId={id} initialData={chapter}>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer" title="Edit Chapter">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </CreateChapterDialog>
                      <button
                        onClick={() => setChapterToDelete(chapter)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Chapter"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {chapterLessons.length === 0 ? (
                      <div className="text-center py-6 mx-auto">
                        <p className="text-slate-500 mb-4">No lessons in this chapter yet.</p>
                        <CreateLessonDialog courseId={id} chapterId={chapter._id}>
                          <button className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add First Lesson
                          </button>
                        </CreateLessonDialog>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {chapterLessons.map((lesson, lessonIndex) => (
                          <div key={lesson._id} className="border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                            <div className="flex flex-col text-left items-start gap-4 flex-1 min-w-0">
                              <div className="flex-1 min-w-0 pr-4">
                                <h4 className="font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                                  {lessonIndex + 1}. {lesson.title}
                                </h4>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <div className="flex items-center gap-2">
                                {lesson.videoUrl && (
                                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                                    Video
                                  </span>
                                )}
                                <CreateLessonDialog courseId={id} chapterId={chapter._id} initialData={lesson}>
                                  <button title="Edit Lesson" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                  </button>
                                </CreateLessonDialog>
                                <button onClick={() => setLessonToDelete(lesson)} title="Delete Lesson" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="pt-3 flex justify-start">
                          <CreateLessonDialog courseId={id} chapterId={chapter._id}>
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Add lesson
                            </button>
                          </CreateLessonDialog>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={!!lessonToDelete}
        onClose={() => setLessonToDelete(null)}
        onConfirm={() => {
          deleteLessonMutation.mutate(lessonToDelete._id, {
            onSuccess: () => setLessonToDelete(null)
          });
        }}
        title="Delete Lesson"
        description={`Are you sure you want to delete "${lessonToDelete?.title}"? This permanently removes the lesson and cannot be undone.`}
        isLoading={deleteLessonMutation.isPending}
      />
      <ConfirmDialog
        isOpen={!!chapterToDelete}
        onClose={() => setChapterToDelete(null)}
        onConfirm={() => {
          deleteChapterMutation.mutate(chapterToDelete._id, {
            onSuccess: () => setChapterToDelete(null)
          });
        }}
        title="Delete Chapter"
        description={`Are you sure you want to delete "${chapterToDelete?.title}"? This permanently removes the chapter and cannot be undone.`}
        isLoading={deleteChapterMutation.isPending}
      />
    </div>
  );
};

export default ManageCourse;
