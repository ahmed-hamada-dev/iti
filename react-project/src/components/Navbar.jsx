import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Cart from './Cart';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update document direction for RTL support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 outline-none">
            <span className="text-xl font-bold text-indigo-600">{t('app.name')}</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Cart />
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
                      <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${user?.role === 'Admin'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-emerald-100 text-emerald-700'
                        }`}>
                        {user?.role}
                      </span>
                    </div>

                    <DropdownMenuSeparator className="my-1" />

                    {user?.role === 'Admin' && (
                      <>
                        <DropdownMenuItem
                          className="cursor-pointer py-2 px-3 font-bold text-indigo-600 focus:text-indigo-700"
                          onClick={() => navigate('/orders')}
                        >
                          Manage Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer py-2 px-3 font-bold text-indigo-600 focus:text-indigo-700"
                          onClick={() => navigate('/dashboard/products')}
                        >
                          Manage Products
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer py-2 px-3 font-bold text-indigo-600 focus:text-indigo-700"
                          onClick={() => navigate('/dashboard/categories')}
                        >
                          Manage Categories
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1" />
                      </>
                    )}

                    <DropdownMenuItem
                      className="cursor-pointer py-2 px-3 font-medium text-slate-700"
                      onClick={() => navigate('/dashboard')}
                    >
                      {t('nav.dashboard')}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer py-2 px-3 text-red-600 focus:text-red-700 focus:bg-red-50 hover:bg-red-50 font-medium"
                      onClick={handleLogout}
                    >
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span>{i18n.language === 'ar' ? '🇸🇦' : '🇬🇧'}</span>
                  <span className="font-medium">{i18n.language.toUpperCase()}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => changeLanguage('en')}
                >
                  🇬🇧 {t('language.english')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => changeLanguage('ar')}
                >
                  🇸🇦 {t('language.arabic')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;