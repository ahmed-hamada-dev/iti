import { useNavigate, useLocation } from 'react-router-dom';
import { Package, User, LogOut, ShoppingBag, Tag, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ user, logout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: t('sidebar.myOrders'), icon: ShoppingBag, path: '/dashboard', adminOnly: false },
    { label: t('sidebar.manageOrders'), icon: Package, path: '/orders', adminOnly: true },
    { label: t('sidebar.manageProducts'), icon: LayoutDashboard, path: '/dashboard/products', adminOnly: true },
    { label: t('sidebar.manageCategories'), icon: Tag, path: '/dashboard/categories', adminOnly: true },
  ];

  const activeItems = navItems.filter(item => !item.adminOnly || user?.role === 'Admin');

  return (
    <aside className="w-full md:w-64 space-y-2">
      <div className="p-6 bg-white rounded-3xl border border-slate-200 mb-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 mx-auto border border-indigo-100">
          <span className="text-2xl font-black text-indigo-600">
            {user?.name?.[0]?.toUpperCase()}
          </span>
        </div>
        <h2 className="text-center font-bold text-slate-800 tracking-tight">{user?.name}</h2>
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{user?.role}</p>
      </div>

      <nav className="space-y-1">
        {activeItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all group ${location.pathname === item.path
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
          >
            <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-white' : 'group-hover:text-indigo-600'}`} />
            {item.label}
          </button>
        ))}

        <div className="pt-4 mt-4 border-t border-slate-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all"
          >
            <LogOut className="w-5 h-5" />
            {t('sidebar.signOut')}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
