import { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { Package, Plus, Trash2, Edit, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductFormDialog from '../components/admin/ProductFormDialog';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

const AdminProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: products, isLoading } = useProducts(debouncedSearch ? { q: debouncedSearch } : {});
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleOpenConfirm = (id) => {
    setProductToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct.mutate(productToDelete, {
      onSuccess: () => setIsConfirmOpen(false)
    });
  };

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    };

    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, data: payload }, {
        onSuccess: () => setIsDialogOpen(false)
      });
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => setIsDialogOpen(false)
      });
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6 group font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('admin.products.backToDashboard')}
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white">{t('admin.products.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('admin.products.subtitle')}</p>
        </div>

        <Button onClick={() => handleOpenDialog()} className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-11 px-6 rounded-xl">
          <Plus className="w-4 h-4" /> {t('admin.products.addProduct')}
        </Button>
      </div>

      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
        categories={categories}
      />

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder={t('admin.products.searchPlaceholder')}
            className="pl-10 h-11 bg-white dark:bg-slate-800"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">{t('admin.products.productName')}</th>
              <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">{t('admin.products.category')}</th>
              <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">{t('admin.products.price')}</th>
              <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">{t('admin.products.stock')}</th>
              <th className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody key={debouncedSearch} className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin" />
                     <p className="text-slate-500 dark:text-slate-400 font-medium">{t('admin.products.scanning')}</p>
                  </div>
                </td>
              </tr>
            ) : !products?.length ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 font-bold">
                  {t('admin.products.noProducts')}
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors animate-fade-in stagger-${(index % 5) + 1}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                      <span className="font-bold text-slate-900 dark:text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">{product.category}</td>
                  <td className="px-6 py-4 font-black text-slate-900 dark:text-white">${product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${product.stock > 5 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'}`}>
                      {product.stock} {t('admin.products.units')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)} className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenConfirm(product.id)} className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title={t('admin.products.deleteConfirm')}
        description={t('admin.products.deleteConfirmDesc')}
        isLoading={deleteProduct.isPending}
      />
    </div>
  );
};

export default AdminProducts;
