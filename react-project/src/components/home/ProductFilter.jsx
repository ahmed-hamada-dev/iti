import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductFilter = ({ search, onSearchChange, category, onCategoryChange, categories }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <div className="w-full max-w-md relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder={t('common.search')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => {
          const isActive = category === cat.value;
          return (
            <button
              key={cat.label}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${isActive
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
