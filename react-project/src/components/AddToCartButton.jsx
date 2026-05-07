import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export function AddToCartButton({
  product,
  className = "",
  showText = true,
  variant = "primary"
}) {
  const { addToCart, items } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!product) return null;

  const cartItem = items.find(item => item.id === product.id);
  const isOutOfStock = product.stock === 0 || (cartItem && cartItem.quantity >= product.stock);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isOutOfStock) {
      addToCart(product);
    }
  };

  const baseClass = "flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-900/10 font-bold",
    icon: "text-slate-600 hover:text-indigo-600"
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      <ShoppingCart className={`${variant === 'icon' ? 'w-6 h-6' : 'w-4 h-4'}`} />
      {showText && (
        <span className="ml-2">
          {isOutOfStock ? (variant === 'icon' ? '' : 'Sold Out') : (variant === 'icon' ? '' : 'Add to Cart')}
        </span>
      )}
    </button>
  );
}
