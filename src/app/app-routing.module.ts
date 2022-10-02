import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./features/sign-up/sign-up.module').then(module => module.SignUpModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
