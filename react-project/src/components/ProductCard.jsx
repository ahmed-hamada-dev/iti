import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { AddToCartButton } from './AddToCartButton';

export function ProductCard({
  product,
  index = 0
}) {
  const { items } = useCart();
  if (!product) return null;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block h-full"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 relative h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl">
        {/* Image Area */}
        <div className="h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/20 dark:border-slate-700">
            <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">${product.price}</span>
          </div>
        </div>

        <div className="p-6 flex flex-col grow">
          <div className="mb-3">
            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
              {product.category}
            </span>
          </div>

          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
            {product.name}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 grow font-medium leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-end pt-5 border-t border-slate-100 dark:border-slate-700 mt-auto gap-4">

            <AddToCartButton
              product={product}
              className="px-4 py-2.5 rounded-xl text-sm"
              showText={true}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
