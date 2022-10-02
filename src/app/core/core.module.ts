import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfigModule } from './auth/auth-config.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthConfigModule,
    MatSnackBarModule
  ]
})
export class CoreModule { }
