import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { rxStompConfig } from './rx-stomp.config';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class StockMarketStompService {
  constructor(private rxStomp: RxStomp, private oidcSecurityService: OidcSecurityService) {
  }

  public connect() {
    this.oidcSecurityService.getAccessToken().subscribe((accessToken) => {
      const headers = { Authorization: `Bearer ${accessToken}` };

      if (accessToken != null && !this.rxStomp.active) {
        this.rxStomp.configure({
          ...rxStompConfig,
          connectHeaders: headers,
        });
      } else {
        this.rxStomp.configure(rxStompConfig);
      }

      this.rxStomp.activate();
    });

  }

  public watchStocksPrices(stockId: number) {
    return this.rxStomp.watch(`/topic/stocks/${stockId}/prices`);
  }

  public watchStocksPricesNotifications() {
    return this.rxStomp.watch('/user/topic/notifications/stocks/prices');
  }
}
