import { useOrders, useUpdateOrderStatus } from '../hooks/useOrders';
import { Search, Eye } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OrderStatusBadge from '../components/admin/OrderStatusBadge';
import OrderDetailsDialog from '../components/admin/OrderDetailsDialog';
import { useDebounce } from '../hooks/useDebounce';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const AdminOrders = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: orders, isLoading } = useOrders({
    _sort: '-createdAt',
    ...(debouncedSearch ? { q: debouncedSearch } : {})
  });
  const updateOrder = useUpdateOrderStatus();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleStatusUpdate = (id, status) => {
    updateOrder.mutate({ id, status }, {
      onSuccess: (updatedOrder) => {
        setSelectedOrder(updatedOrder);
      }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('admin.orders.title')}</h1>
          <p className="text-slate-500">{t('admin.orders.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder={t('admin.orders.searchPlaceholder')}
              className="pl-10 h-11 bg-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <OrderDetailsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Order</th>
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Customer</th>
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Date</th>
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-center">Items</th>
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Total</th>
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-5 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium">{t('admin.orders.tracking')}</p>
                  </div>
                </td>
              </tr>
            ) : !orders || orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-bold">
                  {t('admin.orders.noOrders')}
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-slate-50/50 transition-colors group animate-fade-in stagger-${(index % 5) + 1}`}
                >
                  <td className="px-6 py-5">
                      <span className="font-bold text-slate-900">{t('admin.orders.orderNumber', { id: order.id })}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{order.customer?.name || t('admin.orders.guestUser')}</span>
                      <span className="text-[10px] text-slate-400 font-bold  tracking-tight">{order.customer?.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center -space-x-2 overflow-hidden">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className=" h-8 w-8 rounded-full ring-2 ring-white bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600 uppercase border border-indigo-100 shadow-sm">
                          {item.name[0]}
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className=" h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-black text-slate-900">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="outline" size="sm" className="gap-2 font-bold h-9 rounded-lg" onClick={() => handleOpenDetails(order)}>
                      <Eye className="w-4 h-4" /> {t('admin.orders.details')}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
