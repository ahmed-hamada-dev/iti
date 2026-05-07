import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CheckoutDialog({ isOpen, onOpenChange, onConfirm, total }) {
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
          <DialogTitle className="text-2xl font-black text-slate-900">Finalize Order</DialogTitle>
          <p className="text-slate-500 font-medium">Please enter your shipping information</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold">Full Name</Label>
            <Input 
              id="name" 
              required 
              placeholder="John Doe" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="font-bold">Shipping Address</Label>
            <Input 
              id="address" 
              required 
              placeholder="123 Cosmic St, Nebula City" 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-bold">Phone Number</Label>
            <Input 
              id="phone" 
              required 
              placeholder="+1 234 567 890" 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="h-12"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-slate-500 font-bold text-sm uppercase">Total Amount</span>
            <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black h-14 rounded-2xl text-lg shadow-xl shadow-indigo-600/20"
            >
              Place Cosmic Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
