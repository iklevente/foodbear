import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../models/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-list-by-date',
  templateUrl: './list-by-date.component.html',
})
export class ListByDateComponent implements OnInit {
  dateForm!: FormGroup;
  orders!: Order[];

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      date: [null, { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  async getOrders() {
    try {
      this.orders = await this.orderService.getByDate(this.dateForm.value.date);
    } catch (err) {
      console.log(err);
    }
  }

  getFullPrice() {
    let sum = 0;
    this.orders.forEach((o) => {
      o.orderToFoods.forEach((f) => {
        sum += f.amount * f.food.price;
      });
    });
    return sum;
  }
}
