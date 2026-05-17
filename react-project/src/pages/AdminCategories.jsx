import { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories';
import { Tag, Plus, Trash2, Search, Edit, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CategoryFormDialog from '../components/admin/CategoryFormDialog';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

const AdminCategories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: categories, isLoading } = useCategories(debouncedSearch ? { q: debouncedSearch } : {});
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    type: null, // 'delete' or 'update'
    id: null,
    data: null
  });

  const handleOpenDialog = (category = null) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingCategory) {
      setConfirmState({
        isOpen: true,
        type: 'update',
        id: editingCategory.id,
        data
      });
    } else {
      createCategory.mutate(data, {
        onSuccess: () => setIsDialogOpen(false)
      });
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmState({
      isOpen: true,
      type: 'delete',
      id
    });
  };

  const onConfirmAction = () => {
    if (confirmState.type === 'delete') {
      deleteCategory.mutate(confirmState.id, {
        onSuccess: () => setConfirmState({ ...confirmState, isOpen: false })
      });
    } else if (confirmState.type === 'update') {
      updateCategory.mutate({ id: confirmState.id, data: confirmState.data }, {
        onSuccess: () => {
          setConfirmState({ ...confirmState, isOpen: false });
          setIsDialogOpen(false);
        }
      });
    }
  };

  return (
    <div className="p-8">
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6 group font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('admin.categories.backToDashboard')}
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('admin.categories.title')}</h1>
          <p className="text-slate-500">{t('admin.categories.subtitle')}</p>
        </div>
        
        <Button onClick={() => handleOpenDialog()} className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-11 px-6 rounded-xl">
          <Plus className="w-4 h-4" /> {t('admin.categories.addCategory')}
        </Button>
      </div>

      <CategoryFormDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSubmit={handleFormSubmit}
        initialData={editingCategory}
      />

      <div className="flex items-center gap-4 mb-6">
        <div className="relative grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder={t('admin.categories.searchPlaceholder')} 
            className="pl-10 h-11 bg-white"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div key={debouncedSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-medium">{t('admin.categories.scanning')}</p>
            </div>
          </div>
        ) : !categories?.length ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-bold">
            {t('admin.categories.noCategories')}
          </div>
        ) : (
          categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:shadow-lg hover:shadow-slate-200/50 transition-all animate-fade-in stagger-${(index % 5) + 1}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                   <Tag className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-800 text-lg">{category.name}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleOpenDialog(category)}
                  className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteClick(category.id)}
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog 
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState({ ...confirmState, isOpen: false })}
        onConfirm={onConfirmAction}
        title={confirmState.type === 'delete' ? t('admin.categories.deleteConfirm') : t('admin.categories.updateConfirm')}
        description={confirmState.type === 'delete' ? t('admin.categories.deleteConfirmDesc') : t('admin.categories.updateConfirmDesc')}
        confirmText={confirmState.type === 'delete' ? t('common.delete') : t('admin.categories.saveChanges')}
        variant={confirmState.type === 'delete' ? 'danger' : 'primary'}
        isLoading={deleteCategory.isPending || updateCategory.isPending}
      />
    </div>
  );
};

export default AdminCategories;
