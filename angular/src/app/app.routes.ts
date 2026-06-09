import { Routes } from '@angular/router';
import { HomePage } from '../components/home-page/home-page';
import { ProductDetails } from '../components/product-details/product-details';
import { AddProduct } from '../components/add-product/add-product';
import { Login } from '../components/login/login';
import { Signup } from '../components/signup/signup';
import { NotFound } from '../components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetails },
  { path: 'add-product', component: AddProduct },
  { path: 'edit-product/:id', component: AddProduct },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '**', component: NotFound },
];
