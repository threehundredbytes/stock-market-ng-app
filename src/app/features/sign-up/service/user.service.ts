import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../core/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
  }

  public signUp(user: User): void {
    this.httpClient.post<void>(`${environment.apiUrl}/api/v1/auth/signup`, user, { observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.notificationService.success("Account successfully created");
          }
        },
        error: (errorResponse) => {
          if (errorResponse.status === 409) {
            this.notificationService.error("Account with same username already exist");
          } else {
            this.notificationService.error("An unknown error has occurred!")
          }
        },
      });
  }
}
