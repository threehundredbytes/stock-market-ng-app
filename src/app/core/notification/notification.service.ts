import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  public info(message: string) {
    this.showNotification(message, {
      duration: 3000,
      panelClass: 'info-notification-overlay'
    });
  }

  public success(message: string) {
    this.showNotification(message, {
      duration: 3000,
      panelClass: 'success-notification-overlay'
    });
  }

  public warn(message: string) {
    this.showNotification(message, {
      duration: 3000,
      panelClass: 'warning-notification-overlay'
    });
  }

  public error(message: string) {
    this.showNotification(message, {
      duration: 3000,
      panelClass: 'error-notification-overlay'
    });
  }

  private showNotification(message: string, configuration: MatSnackBarConfig) {
    this.snackBar.open(message, undefined, configuration);
  }
}
