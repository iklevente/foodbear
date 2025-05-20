import { Component, Input, OnInit } from '@angular/core';
import { Courier } from 'src/app/models/Courier';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-table',
  templateUrl: './courier-table.component.html',
})
export class CourierTableComponent implements OnInit {
  @Input() couriers: Courier[] = [];

  constructor() {}

  ngOnInit(): void {}
}
