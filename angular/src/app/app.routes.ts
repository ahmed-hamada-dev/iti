import { Routes } from '@angular/router';
import { Products } from '../components/products/products';
import { ProductDetails } from '../components/product-details/product-details';
import { Home } from '../components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetails },
  { path: '**', redirectTo: '' },
];
