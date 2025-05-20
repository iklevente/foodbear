import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Partner } from '../../models/Partner';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
})
export class PartnerComponent implements OnInit {
  @Input() partner!: Partner;
  @Input() buttons!: boolean;
  @Output() onDeleted = new EventEmitter<number>();
  @Output() onModified = new EventEmitter<Partner>();

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.onDeleted.emit(this.partner.id);
  }
  modify() {
    this.onModified.emit(this.partner);
  }
}
