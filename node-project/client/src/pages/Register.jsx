import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const { isAuthenticated, loading, login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    registerMutation.mutate(formData, {
      onSuccess: (data) => {
        login(data.data);
        navigate('/');
      },
      onError: (err) => {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      },
    });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-5xl">L</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Join Galaxy Learning</h2>
            <p className="text-slate-300 text-lg">Start learning from world-class instructors</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 z-10 flex items-center justify-center p-8">
        <div className="w-full max-w-md relative">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold text-slate-800">Galaxy Learning</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
          <p className="text-slate-500 mb-8">Start your learning journey today</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">I want to...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'Student'
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  <input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={formData.role === 'Student'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.role === 'Student' ? 'bg-indigo-500 text-white' : 'bg-slate-200'
                    }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Learn</p>
                    <p className="text-xs text-slate-500">Take courses</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.role === 'Instructor'
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  <input
                    type="radio"
                    name="role"
                    value="Instructor"
                    checked={formData.role === 'Instructor'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.role === 'Instructor' ? 'bg-indigo-500 text-white' : 'bg-slate-200'
                    }`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Teach</p>
                    <p className="text-xs text-slate-500">Create courses</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;