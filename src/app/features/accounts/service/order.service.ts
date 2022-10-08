import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../stock/model/order.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderRequest } from '../model/order-request.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public placeOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.httpClient.post<Order>(`${environment.apiUrl}/api/v1/orders/`, { observe: 'response' });
  }
}
