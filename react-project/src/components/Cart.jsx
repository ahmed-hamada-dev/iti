import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from './ConfirmDialog';
import { CheckoutDialog } from './CheckoutDialog';
import { useCreateOrder } from '../hooks/useOrders';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    itemId: null,
    itemName: ''
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleDeleteClick = (item) => {
    setConfirmDelete({
      isOpen: true,
      itemId: item.id,
      itemName: item.name
    });
  };

  const handleConfirmDelete = () => {
    removeFromCart(confirmDelete.itemId);
    setConfirmDelete({ isOpen: false, itemId: null, itemName: '' });
  };

  const handleCheckoutConfirm = (userData) => {
    const orderData = {
      userId: user?.id,
      customer: userData,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: total,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    createOrder.mutate(orderData, {
      onSuccess: () => {
        clearCart();
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
        navigate('/dashboard');
      }
    });
  };

  return (
    <>
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogTrigger asChild>
          <button className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors group cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                {itemCount}
              </span>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md overflow-y-scroll bg-white/95 backdrop-blur-xl border-slate-200 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
              Galaxy Cart
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-10 h-10 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                  <p className="text-slate-500 text-sm">Add some cosmic items to get started!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                    <div className="grow">
                      <h4 className="font-bold text-slate-900 leading-tight">{item.name}</h4>
                      <p className="text-indigo-600 font-black text-sm">${item.price}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 px-1 py-1 shadow-sm">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="p-1 hover:text-indigo-600 transition-colors cursor-pointer disabled:opacity-30"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item)}
                          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center px-2">
                <span className="text-slate-500 font-bold">Estimated Total</span>
                <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
              </div>
              <Button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black h-14 rounded-2xl text-lg shadow-xl shadow-slate-900/10 cursor-pointer"
              >
                Checkout Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ ...confirmDelete, isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Remove from Cart"
        description={`Are you sure you want to remove ${confirmDelete.itemName} from your cart?`}
        confirmText="Remove"
        variant="danger"
      />

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        onConfirm={handleCheckoutConfirm}
        total={total}
      />
    </>
  );
};

export default Cart;
