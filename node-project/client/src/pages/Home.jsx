import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { CourseCard } from '../components/CourseCard';
import { Search, Sparkles } from 'lucide-react';
import Galaxy from '../components/Galaxy';

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'Programming', label: 'Programming' },
  { value: 'Design', label: 'Design' },
  { value: 'Business', label: 'Business' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'General', label: 'General' }
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { data, isLoading, error } = useCourses(search ? { search } : category ? { category } : {});

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-24 h-screen pb-32 px-6 overflow-hidden">
        {/* Deep, rich background */}
        <div className="absolute inset-0 bg-[#0B0F19]" />

        {/* Galaxy Background - Must be absolutely positioned to fill the section */}
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.2}
            glowIntensity={0.6}
            saturation={0.5}
            hueShift={20}
            twinkleIntensity={0.8}
            rotationSpeed={0.05}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.8}
            speed={1.5}
          />
        </div>

        {/* Floating grid pattern overlay - pointer events none so it doesn't block mouse */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

        {/* Pointer-events-none layer to let mouse reach the Galaxy, but restoring pointer-events-auto to children that need to be interactive */}
        <div className="relative max-w-6xl mx-auto flex flex-col items-center z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 pointer-events-auto">
            <span className="text-sm font-medium text-indigo-100 tracking-wide">Enter the Learning Galaxy</span>
          </div>

          <div className="text-center mb-12 w-full max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Explore a Universe of <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-indigo-600">Knowledge</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Chart your course to mastery with expert instructors.
              Let curiosity be your compass in an expanding cosmos of learning.
            </p>
          </div>


        </div>
      </section>

      {/* Courses List Section */}
      <section className="py-24 px-6 relative z-20 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="flex flex-col items-center text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Explore Our Courses</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Browse through our extensive library of professionally crafted courses spanning programming, design, and business.</p>
            </div>

            {/* Pill shaped category filters */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.value;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setCategory(cat.value)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${isActive
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8 w-full max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium">Loading amazing courses...</p>
              </div>
            ) : error ? (
              <div className="text-center py-32">
                <div className="inline-flex w-16 h-16 rounded-full bg-red-100 text-red-500 items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-slate-500">We couldn't load the courses. Please try again later.</p>
              </div>
            ) : !data?.data?.length ? (
              <div className="text-center py-32">
                <div className="inline-flex w-24 h-24 rounded-full bg-slate-100 text-slate-400 items-center justify-center mb-6">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">No courses found</h3>
                <p className="text-lg text-slate-500 max-w-md mx-auto">We couldn't find any courses matching your current search or category filter. Try clearing your search.</p>
                {(search || category) && (
                  <button
                    onClick={() => { setSearch(''); setCategory(''); }}
                    className="mt-8 px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.data.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    variant="public"
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;