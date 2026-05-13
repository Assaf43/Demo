import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)},
    {path: 'shop' , loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent)},
    {path: 'shop/:id' , loadComponent: () => import('./features/shop/product-details/product-details.component').then(m => m.ProductDetailsComponent)},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
