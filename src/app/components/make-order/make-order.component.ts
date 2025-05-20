import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/models/Food';
import { Partner } from 'src/app/models/Partner';
import { OrderService } from 'src/app/services/order.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
})
export class MakeOrderComponent implements OnInit {
  orderForm: FormGroup;
  partnerForm: FormGroup;
  partnerSelected: boolean = false;
  partner!: Partner;
  partners: Partner[] = [];
  foods!: Food[];

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private partnerService: PartnerService
  ) {
    this.orderForm = this.fb.group({
      id: [null],
      address: [
        '',
        { validators: [Validators.required, Validators.minLength(5)] },
      ],
      orderTime: [null],
      deliveryTime: [null],
      note: [''],
      name: [
        '',
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
      courier: [null],
      delivered: [false],
      orderToFoods: [[]],
    });
    this.partnerForm = this.fb.group({
      partner: [null],
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.partners = await this.partnerService.getAll();
      if (this.partners.length > 0)
        this.partnerForm.patchValue({ partner: this.partners[0].id });
    } catch (err) {
      console.log(err);
    }
  }

  selectPartner() {
    this.partner = this.partners.find(
      (f) => f.id == this.partnerForm.value.partner
    )!;
    this.partnerSelected = true;
    this.foods = this.partner.foods;
    this.foods.forEach((f) => {
      this.orderForm.addControl(
        f.id.toString(),
        this.fb.control(0, { validators: [Validators.min(0)] })
      );
    });
  }

  async makeOrder() {
    let newOrder = this.orderForm.value;
    newOrder.orderToFoods = [];
    this.foods.forEach((f) => {
      if (this.orderForm.get(f.id.toString())?.value > 0) {
        newOrder.orderToFoods.push({
          food: f,
          amount: this.orderForm.get(f.id.toString())?.value,
        });
      }
    });

    try {
      const returnedOrder = await this.orderService.create(newOrder);
      window.alert('Order created');
    } catch (err) {
      window.alert((err as any).error);
    }
  }
}
