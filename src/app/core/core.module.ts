import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfigModule } from './auth/auth-config.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthConfigModule
  ]
})
export class CoreModule { }
