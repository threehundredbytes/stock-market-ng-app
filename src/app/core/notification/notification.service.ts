import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { StockPriceNotificationRequest } from '../model/request/stock-price-notification.request.model';
import { StockPriceNotificationResponse } from '../model/response/stock-price-notification.response.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
  }

  public createStockPriceNotification(request: StockPriceNotificationRequest): Observable<StockPriceNotificationResponse> {
    return this.httpClient.post<StockPriceNotificationResponse>(`${environment.apiUrl}/api/v1/notifications/`, request, { observe: 'body' });
  }

  public deactivateStockPriceNotification(notificationId: number): void {
    this.httpClient.delete<StockPriceNotificationResponse>(`${environment.apiUrl}/api/v1/notifications/${notificationId}`);
  }

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
