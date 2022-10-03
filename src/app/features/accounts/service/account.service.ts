import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Account } from '../model/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  public getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${environment.apiUrl}/api/v1/accounts`, { observe: 'body' });
  }

  public createAccount(): Observable<Account> {
    return this.httpClient.post<Account>(`${environment.apiUrl}/api/v1/accounts`, {}, { observe: 'body' });
  }
}
