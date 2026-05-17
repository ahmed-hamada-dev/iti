import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export function CheckoutDialog({ isOpen, onOpenChange, onConfirm, total }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900">{t('checkout.title')}</DialogTitle>
          <p className="text-slate-500 font-medium">{t('checkout.subtitle')}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold">{t('checkout.fullName')}</Label>
            <Input 
              id="name" 
              required 
              placeholder={t('checkout.placeholders.name')} 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">{t('checkout.emailAddress')}</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              placeholder={t('checkout.placeholders.email')} 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="font-bold">{t('checkout.shippingAddress')}</Label>
            <Input 
              id="address" 
              required 
              placeholder={t('checkout.placeholders.address')} 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-bold">{t('checkout.phoneNumber')}</Label>
            <Input 
              id="phone" 
              required 
              placeholder={t('checkout.placeholders.phone')} 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="h-12"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 font-bold text-sm uppercase">{t('checkout.totalAmount')}</span>
            <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black h-14 rounded-2xl text-lg shadow-xl shadow-indigo-600/20"
            >
              {t('checkout.placeOrder')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
