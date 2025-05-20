import { Component, OnInit } from '@angular/core';
import { Courier } from 'src/app/models/Courier';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-list-couriers',
  templateUrl: './list-couriers.component.html',
})
export class ListCouriersComponent implements OnInit {
  couriers: Courier[] = [];

  constructor(private courierService: CourierService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.couriers = await this.courierService.getAll();
    } catch (err) {
      console.log(err);
    }
  }
}
