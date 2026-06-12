import { Routes } from '@angular/router';
import { HomePage } from '../components/home-page/home-page';
import { Login } from '../components/login/login';
import { Signup } from '../components/signup/signup';
import { NotFound } from '../components/not-found/not-found';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'product/:id',
        loadComponent: () => import('../components/product-details/product-details').then((m) => m.ProductDetails),
      },
      {
        path: 'add-product',
        loadComponent: () => import('../components/add-product/add-product').then((m) => m.AddProduct),
      },
      {
        path: 'edit-product/:id',
        loadComponent: () => import('../components/add-product/add-product').then((m) => m.AddProduct),
      },
    ],
  },
  { path: '**', component: NotFound },
];
