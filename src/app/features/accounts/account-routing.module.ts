import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsPageComponent } from './page/accounts-page/accounts-page.component';
import { AccountPageComponent } from './page/account-page/account-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsPageComponent,
  },
  {
    path: ':accountId',
    component: AccountPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
