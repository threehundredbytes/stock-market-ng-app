import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthConfigModule } from './auth/auth-config.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpAuthenticationInterceptor } from './http-interceptor/http-authentication.interceptor';
import { JsonDateInterceptor } from './http-interceptor/json-date.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthConfigModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonDateInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
