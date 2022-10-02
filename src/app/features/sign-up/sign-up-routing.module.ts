import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './page/sign-up-page/sign-up-page.component';
import { NotAuthenticatedGuard } from '../../core/guard/not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: SignUpPageComponent,
    canActivate: [
      NotAuthenticatedGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
