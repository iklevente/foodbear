import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';
import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
})
export class FoodDetailsComponent implements OnInit {
  @Input() food!: Food;
  orders: Order[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private orderService: OrderService
  ) {
    this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit(): Promise<void> {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.food = history.state.food;
    if (!this.food) {
      try {
        this.food = await this.foodService.get(
          parseInt(this.activatedRoute.snapshot.paramMap.get('id')!)
        );
      } catch (err) {
        console.log(err);
      }
    }

    try {
      this.orders = await this.orderService.getCourierByFoodId(this.food.id);
    } catch (err) {
      console.log(err);
    }
  }
}
