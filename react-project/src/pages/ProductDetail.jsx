import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { AddToCartButton } from '../components/AddToCartButton';
import { ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import Galaxy from '../components/Galaxy';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">{t('product.notFound')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">{t('product.notFoundSubtitle')}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium"
        >
          {t('product.backToShop')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header Space */}
      <div className="h-20 bg-white dark:bg-slate-900" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t('product.backToProducts')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl group">
            <div className="absolute inset-0 z-0 bg-[#0B0F19] opacity-0 group-hover:opacity-10 transition-opacity" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Galaxy overlay on image for flair */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
              <Galaxy
                density={0.5}
                speed={0.5}
                starSpeed={0.2}
                twinkleIntensity={0.5}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 rounded-full mb-4 inline-block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground dark:text-white mb-4 tracking-tight">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-indigo-600 mb-6">
                ${product.price}
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features/Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-y border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">{t('product.features.freeDelivery')}</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('product.features.freeDeliveryDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">{t('product.features.warranty')}</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('product.features.warrantyDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">{t('product.features.easyReturns')}</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('product.features.easyReturnsDesc')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{t('product.availability')}</span>
                <span className={`text-sm font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? t('product.inStock', { count: product.stock }) : t('product.outOfStock')}
                </span>
              </div>

              <AddToCartButton
                product={product}
                className="w-full py-5 rounded-2xl text-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
