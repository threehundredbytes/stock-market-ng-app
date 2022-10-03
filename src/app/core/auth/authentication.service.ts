import { Injectable } from '@angular/core';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthenticated$: Observable<boolean>;
  public accessToken$: Observable<string>;

  constructor(private oidcSecurityService: OidcSecurityService, private eventService: PublicEventsService) {
    this.isAuthenticated$ = this.oidcSecurityService.checkAuth().pipe(
      map(loginResponse => loginResponse.isAuthenticated)
    );

    this.accessToken$ = this.oidcSecurityService.getAccessToken();

    this.eventService
      .registerForEvents()
      .pipe(filter((notification) => notification.type === EventTypes.TokenExpired))
      .subscribe((value) => {
        this.oidcSecurityService.forceRefreshSession();
      });
  }

  public login(): void {
    this.oidcSecurityService.authorize();
  }

  public logout(): void {
    this.oidcSecurityService.logoff();
  }
}
