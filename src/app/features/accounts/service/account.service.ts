import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Account } from '../model/account.model';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  public getAccountById(accountId: number): Observable<Account> {
    return this.httpClient.get<Account>(`${environment.apiUrl}/api/v1/accounts/${accountId}`, { observe: 'body' });
  }

  public getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${environment.apiUrl}/api/v1/accounts`, { observe: 'body' });
  }

  public getAllStocksOnAccount(accountId: number): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${environment.apiUrl}/api/v1/accounts/${accountId}/stocks`, { observe: 'body' });
  }

  public createAccount(): Observable<Account> {
    return this.httpClient.post<Account>(`${environment.apiUrl}/api/v1/accounts`, {}, { observe: 'body' });
  }
}
