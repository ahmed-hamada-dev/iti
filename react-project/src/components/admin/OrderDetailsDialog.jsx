import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import OrderStatusBadge from './OrderStatusBadge';
import { Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const OrderDetailsDialog = ({ open, onOpenChange, order, onStatusUpdate }) => {
  const { t } = useTranslation();
  if (!order) return null;

  const statusIcons = {
    'Pending': <Clock className="w-4 h-4" />,
    'On way': <Truck className="w-4 h-4" />,
    'Delivered': <CheckCircle className="w-4 h-4" />,
    'Canceled': <XCircle className="w-4 h-4" />
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-foreground dark:text-white">
             <span>{t('admin.orders.orderDetails', { id: order.id })}</span>
             <OrderStatusBadge status={order.status} />
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin.orders.items')}</h4>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-xs font-bold text-foreground dark:text-white">
                    {item.quantity}
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center py-4 border-t border-slate-100 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white">{t('checkout.totalAmount')}</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">${Number(order.total).toFixed(2)}</span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('admin.orders.changeStatus')}</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Pending', 'On way', 'Delivered', 'Canceled'].map(status => (
                <Button 
                  key={status}
                  variant={order.status === status ? 'default' : 'outline'}
                  className={`justify-start gap-2 h-11 ${order.status === status ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : ''}`}
                  onClick={() => onStatusUpdate(order.id, status)}
                >
                  {statusIcons[status]}
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
