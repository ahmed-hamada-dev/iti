import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 outline-none">

            <span className="text-xl font-bold text-indigo-600">Galaxy Learning</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors outline-none cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-600">
                        {user?.name?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500 mb-2 truncate">{user?.email}</p>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${user?.role === 'Instructor'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-emerald-100 text-emerald-700'
                      }`}>
                      {user?.role}
                    </span>
                  </div>

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    className="cursor-pointer py-2 px-3 font-medium text-slate-700"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer py-2 px-3 text-red-600 focus:text-red-700 focus:bg-red-50 hover:bg-red-50 font-medium"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;