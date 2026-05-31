import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { emptyCartGuard } from './core/guards/empty-cart-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent),
  },
  {
    path: 'shop/:id',
    loadComponent: () =>
      import('./features/shop/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
  },
  {
    path: 'cart', loadComponent: () => 
      import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout', loadComponent: () => 
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
      canActivate: [authGuard,emptyCartGuard]
  },
  {
    path: 'login', loadComponent: () => 
      import('./features/account/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register', loadComponent: () => 
      import('./features/account/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'test-error',
    loadComponent: () =>
      import('./features/test-error/test-error.component').then((m) => m.TestErrorComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('./shared/components/server-error/server-error.component').then(
        (m) => m.ServerErrorComponent,
      ),
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
