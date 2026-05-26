import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { Package, Clock, CheckCircle2, Truck, XCircle, ShoppingBag } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import { useTranslation } from 'react-i18next';

const StatusBadge = ({ status, t }) => {
  const styles = {
    'Pending': 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800',
    'Processing': 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800',
    'On way': 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800',
    'Delivered': 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800',
    'Canceled': 'bg-red-50 text-red-600 border-red-100 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800'
  };

  const icons = {
    'Pending': Clock,
    'Processing': Package,
    'On way': Truck,
    'Delivered': CheckCircle2,
    'Canceled': XCircle
  };

  const Icon = icons[status] || Clock;

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.Pending}`}>
      <Icon className="w-3.5 h-3.5" />
      {t(`status.${status.toLowerCase().replace(' ', '')}`) || status}
    </span>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { data: orders, isLoading } = useOrders({ 
    userId: user?.id ? String(user.id) : undefined,
    _sort: '-createdAt'
  });

  const totalSpent = orders?.reduce((sum, order) => sum + order.total, 0) || 0;

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          <Sidebar user={user} logout={logout} />

          {/* Main Content */}
          <main className="flex-grow">
            <div className="bg-card dark:bg-slate-900 rounded-3xl border border-border dark:border-slate-700 p-8 min-h-[600px] shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black text-foreground dark:text-white">{t('dashboard.title')}</h1>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('dashboard.activeMember')}</p>
                  <p className="text-sm font-bold text-indigo-600">ID: {user?.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                 <div className="p-6 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800 flex items-center justify-between">
                     <div>
                       <h4 className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">{t('dashboard.stats.totalSpending')}</h4>
                       <p className="text-3xl font-black text-foreground dark:text-white">${totalSpent.toFixed(2)}</p>
                     </div>
                    <div className="w-12 h-12 bg-white dark:bg-indigo-900 rounded-xl flex items-center justify-center shadow-sm">
                      <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                 </div>
                 <div className="p-6 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex items-center justify-between">
                     <div>
                       <h4 className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">{t('dashboard.stats.ordersCount')}</h4>
                       <p className="text-3xl font-black text-foreground dark:text-white">{orders?.length || 0} {t('dashboard.stats.items')}</p>
                     </div>
                    <div className="w-12 h-12 bg-white dark:bg-emerald-900 rounded-xl flex items-center justify-center shadow-sm">
                      <Package className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                 </div>
              </div>

              <div>
                  <h3 className="text-lg font-bold text-foreground dark:text-white mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    {t('dashboard.recentOrders')}
                  </h3>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                     <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin" />
                  </div>
                ) : !orders || orders.length === 0 ? (
                   <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-700">
                     <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <ShoppingBag className="w-8 h-8 text-slate-300 dark:text-slate-500" />
                     </div>
                      <h4 className="text-lg font-bold text-foreground dark:text-white mb-1">{t('dashboard.noOrders')}</h4>
                      <p className="text-muted-foreground dark:text-slate-400 text-sm max-w-[200px]">{t('dashboard.noOrdersSubtitle')}</p>
                   </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                       <div key={order.id} className="p-5 border border-slate-100 dark:border-slate-700 rounded-2xl hover:border-indigo-100 dark:hover:border-indigo-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                         <div className="flex flex-col sm:flex-row justify-between gap-4">
                           <div className="flex gap-4">
                             <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm">
                                <Package className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                             </div>
                             <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-foreground dark:text-white">{t('dashboard.orderNumber', { id: order.id })}</span>
                                  <StatusBadge status={order.status} t={t} />
                               </div>
                               <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t('dashboard.grandTotal')}</p>
                              <p className="text-xl font-black text-foreground dark:text-white">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
