import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public signUp(user: User): void {
    console.log(user);

    this.httpClient.post<void>(`${environment.apiUrl}/api/v1/auth/signup`, user).subscribe(response => console.log(response));
  }
}
