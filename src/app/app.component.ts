import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-market-ng-app';

  public isAuthenticated = false;
  public isSidebarOpened = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
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
}
