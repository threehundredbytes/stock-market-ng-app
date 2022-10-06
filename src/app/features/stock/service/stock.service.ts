import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Stock } from '../model/stock.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  public getAllStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${environment.apiUrl}/api/v1/stocks`, { observe: 'body' });
  }

  public getStockById(stockId: number): Observable<Stock> {
    return this.httpClient.get<Stock>(`${environment.apiUrl}/api/v1/stocks/${stockId}`, { observe: 'body' });
  }
}
