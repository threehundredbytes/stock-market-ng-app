import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {
  constructor(private oidcSecurityService: OidcSecurityService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.oidcSecurityService.getAccessToken().subscribe((accessToken) => {
      console.log(accessToken);

      if (accessToken !== null) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
        });
      }
    });

    return next.handle(request);
  }
}
