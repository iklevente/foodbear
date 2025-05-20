import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
})
export class ListFoodsComponent implements OnInit {
  foods!: Food[];

  constructor(private foodService: FoodService) {}

  async ngOnInit() {
    try {
      this.foods = await this.foodService.getAll();
    } catch (err) {
      console.log(err);
    }
  }
}
