import { Routes } from '@angular/router';
import { HomePage } from '../components/home-page/home-page';
import { ProductDetails } from '../components/product-details/product-details';
import { AddProduct } from '../components/add-product/add-product';
import { NotFound } from '../components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetails },
  { path: 'add-product', component: AddProduct },
  { path: 'edit-product/:id', component: AddProduct },
  { path: '**', component: NotFound },
];
