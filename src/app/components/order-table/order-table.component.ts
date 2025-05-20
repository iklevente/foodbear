import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Partner } from 'src/app/models/Partner';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent implements OnInit {
  @Input() orders!: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  getFullPrice(order: Order): number {
    let price = 0;
    order.orderToFoods.forEach((food) => {
      price += food.food.price * food.amount;
    });
    return price;
  }

  getPartner(): Partner {
    return this.orders[0].orderToFoods[0].food.partner;
  }

  async deliverOrder(orderId: number) {
    try {
      const result = await this.orderService.deliverOrder(orderId);
      if (result) {
        alert('Rendelés megérkezett!');

        let id = this.orders.findIndex((order) => order.id === orderId);
        this.orders[id].delivered = result.delivered;
        this.orders[id].deliveryTime = result.deliveryTime;
      }
    } catch (err) {
      console.log(err);
    }
  }

  deleteOrder(orderId: number) {
    try {
      this.orderService.delete(orderId);
      this.orders.splice(
        this.orders.findIndex((order) => order.id === orderId),
        1
      );
    } catch (err) {
      console.log(err);
    }
  }
}
