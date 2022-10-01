import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './page/sign-up-page/sign-up-page.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
