import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { Order } from 'src/app/models/Order';
import { Partner } from 'src/app/models/Partner';
import { OrderService } from 'src/app/services/order.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
})
export class PartnerDetailsComponent implements OnInit {
  partner!: Partner;
  orders!: Order[];

  constructor(
    private partnerService: PartnerService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.partner = await this.partnerService.get(parseInt(id!));
      this.orders = await this.orderService.getOrderByPartnerId(parseInt(id!));
    } catch (err) {
      console.log(err);
    }
  }

  getFoods(): Food[] {
    let clone = JSON.parse(JSON.stringify(this.partner.foods));
    clone.forEach((food: Food) => {
      food.partner = this.partner;
    });
    return clone;
  }
}
