import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public findAllByStockId(stockId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.apiUrl}/api/v1/orders/stocks/${stockId}`, { observe: 'body' });
  }
}
