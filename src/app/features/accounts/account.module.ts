import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPageComponent } from './page/accounts-page/accounts-page.component';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../../core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PaymentDialogComponent } from './component/payment-dialog/payment-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AccountPageComponent } from './page/account-page/account-page.component';

@NgModule({
  declarations: [
    AccountsPageComponent,
    PaymentDialogComponent,
    AccountPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccountRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
  ],
})
export class AccountModule { }
