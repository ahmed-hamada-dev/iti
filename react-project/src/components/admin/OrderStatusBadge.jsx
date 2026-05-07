import { Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const getStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'On way': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Canceled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'On way': return <Truck className="w-3.5 h-3.5" />;
      case 'Pending': return <Clock className="w-3.5 h-3.5" />;
      case 'Canceled': return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStyle(status)}`}>
      {getIcon(status)}
      {status}
    </span>
  );
};

export default OrderStatusBadge;
