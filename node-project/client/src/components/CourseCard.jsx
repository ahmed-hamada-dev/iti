import { Link } from 'react-router-dom';
import { CourseContextMenu } from './CourseContextMenu';

export function CourseCard({
  course,
  variant = 'public',
  enrollment = null,
  index = 0,
  instructorLinkText = 'Preview Course →',
  instructorLinkHref
}) {
  const isInstructor = variant === 'instructor';
  const isEnrolled = variant === 'enrolled';
  const isPublic = variant === 'public';

  const displayCourse = isEnrolled && enrollment?.courseId ? enrollment.courseId : course;
  if (!displayCourse) return null;

  const targetHref = instructorLinkHref || `/courses/${displayCourse._id}`;

  const CardContent = () => (
    <article className={`bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 relative h-full flex flex-col ${!isInstructor ? 'hover:-translate-y-1 hover:shadow-xl' : 'hover:border-indigo-400 hover:shadow-lg group'}`}>

      {/* Image Area */}
      {displayCourse.imageUrl ? (
        <div className="h-40 w-full bg-slate-100 flex items-center justify-center relative">
          <img src={displayCourse.imageUrl} alt={displayCourse.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
          <span className="text-6xl opacity-30">{displayCourse.category?.[0] || '📚'}</span>
        </div>
      )}

      {/* Overlays */}
      {isPublic && (
        <div className="p-6 pb-0">
          <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
            {displayCourse.category}
          </span>
        </div>
      )}

      {isInstructor && (
        <div className="absolute top-3 right-3 z-10">
          <CourseContextMenu course={displayCourse} />
        </div>
      )}

      <div className={`p-6 flex flex-col flex-grow ${isPublic ? 'pt-3' : ''}`}>
        {isInstructor && (
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
              {displayCourse.category}
            </span>
            <span className="text-xs text-slate-400">{displayCourse.lessonsCount || 0} lessons</span>
          </div>
        )}

        <h3 className={`font-bold text-slate-800 mb-2 transition-colors ${isEnrolled ? 'group-hover:text-emerald-600' : 'group-hover:text-indigo-600'
          } ${isPublic || isInstructor ? 'text-xl' : 'text-lg'}`}>
          {displayCourse.title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {displayCourse.description}
        </p>

        {/* Footers */}
        {isPublic && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-xs font-medium text-slate-600">
                  {displayCourse.instructorId?.name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <span className="text-sm text-slate-600">{displayCourse.instructorId?.name}</span>
            </div>
            <span className="text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              View →
            </span>
          </div>
        )}

        {isEnrolled && (
          <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-4 border-t border-slate-50">
            <span>{displayCourse.instructorId?.name}</span>
            <span>Enrolled {new Date(enrollment.createdAt).toLocaleDateString()}</span>
          </div>
        )}

        {isInstructor && (
          <div className="pt-4 border-t border-slate-100 mt-auto">
            <Link
              to={targetHref}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-block"
            >
              {instructorLinkText}
            </Link>
          </div>
        )}
      </div>
    </article>
  );

  if (isInstructor) {
    return <CardContent />;
  }

  return (
    <Link
      to={`/courses/${displayCourse._id}`}
      className="group block h-full flex-grow"
      style={{ animationDelay: index ? `${index * 50}ms` : '0ms' }}
    >
      <CardContent />
    </Link>
  );
}
