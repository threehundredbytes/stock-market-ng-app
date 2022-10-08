import { Injectable } from '@angular/core';
import { EventTypes, OidcSecurityService, PublicEventsService } from 'angular-auth-oidc-client';
import { filter, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockMarketStompService } from '../stomp/stock-market-stomp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthenticated$: Observable<boolean>;

  constructor(private oidcSecurityService: OidcSecurityService,
              private stockMarketStompService: StockMarketStompService,
              private eventService: PublicEventsService) {
    this.isAuthenticated$ = this.oidcSecurityService.checkAuth().pipe(
      map(loginResponse => loginResponse.isAuthenticated),
      tap(() => this.stockMarketStompService.connect())
    );

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
