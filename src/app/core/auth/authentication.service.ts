import { Injectable } from '@angular/core';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxStompService } from '../stomp/rx-stomp.service';
import { rxStompConfig } from '../stomp/rx-stomp.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthenticated$: Observable<boolean>;

  constructor(private oidcSecurityService: OidcSecurityService, private eventService: PublicEventsService, private rxStompService: RxStompService) {
    this.isAuthenticated$ = this.oidcSecurityService.checkAuth().pipe(
      map(loginResponse => loginResponse.isAuthenticated)
    );

    this.oidcSecurityService.getAccessToken().subscribe((accessToken) => {
      if (accessToken != null) {
        rxStompService.activateWithHeaders({
          Authorization: `Bearer ${accessToken}`
        });
      } else {
        rxStompService.configureAndActivate();
      }
    });

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
