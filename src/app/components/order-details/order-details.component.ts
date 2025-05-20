import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Partner } from 'src/app/models/Partner';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit {
  order!: Order;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.order = await this.orderService.get(parseInt(id));
    } catch (err) {
      console.log(err);
    }
  }

  getFoods(): Food[] {
    let foods: Food[] = [];
    this.order.orderToFoods.forEach((f) => {
      if (!foods.includes(f.food)) {
        foods.push(f.food);
      }
    });
    return foods;
  }

  getRestaurants(): Partner[] {
    let restaurants: Partner[] = [];
    if (this.order.orderToFoods.length > 0) {
      restaurants.push(this.order.orderToFoods[0].food.partner);
    }
    return restaurants;
  }

  getFullPrice(): number {
    let price: number = 0;
    this.order.orderToFoods.forEach((f) => {
      price += f.food.price * f.amount;
    });
    return price;
  }

  async deliverOrder(orderId: number) {
    try {
      const result = await this.orderService.deliverOrder(orderId);
      if (result) {
        alert('Rendelés megérkezett!');

        this.order.delivered = result.delivered;
        this.order.deliveryTime = result.deliveryTime;
      }
    } catch (err) {
      console.log(err);
    }
  }

  deleteOrder(orderId: number) {
    try {
      this.orderService.delete(orderId);
      alert('Rendelés törölve!');
      this.router.navigate(['/mainpage/orderlist']);
    } catch (err) {
      console.log(err);
    }
  }
}
