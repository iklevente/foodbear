import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courier } from 'src/app/models/Courier';
import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Partner } from 'src/app/models/Partner';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-details',
  templateUrl: './courier-details.component.html',
  styleUrls: ['./courier-details.component.css'],
})
export class CourierDetailsComponent implements OnInit {
  @Input() courier!: Courier;

  constructor(
    private courierService: CourierService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.courier = await this.courierService.get(parseInt(id));
    } catch (err) {
      console.log(err);
    }
  }

  getRestaurants(): Partner[] {
    let restaurants: Partner[] = [];
    this.courier.orders.forEach((order) => {
      order.orderToFoods.forEach((food) => {
        if (!restaurants.includes(food.food.partner)) {
          restaurants.push(food.food.partner);
        }
      });
    });
    return restaurants;
  }

  getFoods(): Food[] {
    let foods: Food[] = [];
    this.courier.orders.forEach((order) => {
      order.orderToFoods.forEach((food) => {
        if (!foods.includes(food.food)) {
          foods.push(food.food);
        }
      });
    });
    return foods;
  }

  getOrders(): Order[] {
    let orders: Order[] = this.courier.orders;
    orders.forEach((order) => {
      order.courier = new Courier();
      order.courier.name = this.courier.name;
      order.courier.id = this.courier.id;
    });
    return orders;
  }
}
