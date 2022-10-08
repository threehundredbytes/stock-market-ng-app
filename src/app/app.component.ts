import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';
import { ThemeService } from './core/theme/theme.service';
import { StockMarketStompService } from './core/stomp/stock-market-stomp.service';
import { NotificationService } from './core/notification/notification.service';
import { StockPriceNotification } from './core/model/notification/stock-price.notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-market-ng-app';

  public isAuthenticated = false;
  public isSidebarOpened = false;
  public isDarkModeEnabled = false;

  constructor(private authenticationService: AuthenticationService,
              private stockMarketStompService: StockMarketStompService,
              private notificationService: NotificationService,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        this.stockMarketStompService.watchStocksPricesNotifications().subscribe(message => {
          const notification: StockPriceNotification = JSON.parse(message.body);

          this.notificationService.info(`${notification.stockTicker} stock price reaches ${notification.pricePerStock} Units.`)
        });
      }
    });

    this.themeService.isDarkModeEnabled$.subscribe(isDarkModeEnabled => {
      this.isDarkModeEnabled = isDarkModeEnabled;
    });
  }

  public login(): void {
    this.authenticationService.login();
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }
}
