import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../../stock/model/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  public getStocksByIds(stockIds: number[]): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${environment.apiUrl}/api/v1/stocks/${stockIds}`, { observe: 'body' });
  }
}
