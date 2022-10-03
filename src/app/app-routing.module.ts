import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guard/authenticated.guard';
import { NotAuthenticatedGuard } from './core/guard/not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/sign-up/sign-up.module').then(module => module.SignUpModule),
    canLoad: [NotAuthenticatedGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./features/accounts/account.module').then(module => module.AccountModule),
    canLoad: [AuthenticatedGuard]
  },
  {
    path: 'stocks',
    loadChildren: () => import('./features/stock/stock.module').then(module => module.StockModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
