import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Order } from '../models/Order';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {

  constructor(http: HttpClient) {
    super(http, "order");
  }

  getOrderByPartnerId(partnerId: number) {
    return lastValueFrom(this.http.get<Order[]>(`/api/order/partner/${partnerId}`));
  }

  async getCourierByFoodId(foodId: number): Promise<Order[]> {
    return await lastValueFrom(this.http.get<Order[]>(`api/order/food/${foodId}`));
  }

  async deliverOrder(orderId: number): Promise<Order> {
    return await lastValueFrom(this.http.get<Order>(`api/order/${orderId}/deliver`));
  }

  async getByDate(date:String): Promise<Order[]> {
    return await lastValueFrom(this.http.get<Order[]>(`api/order/?date=${date}`));
  }

}
