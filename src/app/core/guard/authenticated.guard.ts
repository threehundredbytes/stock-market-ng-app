import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {
  private isAuthenticated: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/');

      return false;
    }
  }
}
