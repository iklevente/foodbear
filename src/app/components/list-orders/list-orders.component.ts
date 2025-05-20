import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
})
export class ListOrdersComponent implements OnInit {
  orders!: Order[];

  constructor(private orderService: OrderService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.orders = await this.orderService.getAll();
    } catch (err) {
      console.log(err);
    }
  }
}
