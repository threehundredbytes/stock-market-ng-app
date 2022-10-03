import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPageComponent } from './page/accounts-page/accounts-page.component';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../../core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AccountsPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccountRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class AccountModule { }
