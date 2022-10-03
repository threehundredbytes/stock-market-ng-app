import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthenticated$: Observable<boolean>;
  public accessToken$: Observable<string>;

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.isAuthenticated$ = this.oidcSecurityService.checkAuth().pipe(
      map(loginResponse => loginResponse.isAuthenticated)
    );

    this.accessToken$ = this.oidcSecurityService.getAccessToken();
  }

  public login(): void {
    this.oidcSecurityService.authorize();
  }

  public logout(): void {
    this.oidcSecurityService.logoff();
  }
}
