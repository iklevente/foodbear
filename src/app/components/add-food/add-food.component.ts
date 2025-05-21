import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/models/Food';
import { Partner } from 'src/app/models/Partner';
import { FoodService } from 'src/app/services/food.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  foodForm: FormGroup;
  serversideError: boolean = false;
  modifyEnabled: boolean = false;
  foods: Food[] = [];
  partners: Partner[] = [];

  constructor(
    private foodService: FoodService,
    private fb: FormBuilder,
    private partnerService: PartnerService
  ) {
    this.foodForm = this.fb.group({
      id: [null],
      name: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur',
        },
      ],
      price: [
        '',
        {
          validators: [Validators.required, Validators.min(0)],
          updateOn: 'blur',
        },
      ],
      description: [''],
      imageUrl: [
        '',
        {
          validators: [
            Validators.pattern(
              /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
            ),
          ],
          updateOn: 'blur',
        },
      ],
      partner: [null, Validators.required],
    });
  }
  async ngOnInit(): Promise<void> {
    try {
      this.foods = await this.foodService.getAll();
      this.partners = await this.partnerService.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  async addFood() {
    try {
      this.foodForm.patchValue({ id: null });
      const result = await this.foodService.create(this.foodForm.value);
      result.partner = this.partners.find((p) => p.id === <any>result.partner)!;
      this.foods.push(result);
    } catch (err) {
      console.log(err);
    }
  }

  async updateFood() {
    try {
      const result = await this.foodService.update(this.foodForm.value);
      this.foods = this.foods.map((f) => (f.id === result.id ? result : f));
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFood(food: Food) {
    try {
      await this.foodService.delete(food.id);
      this.foods = this.foods.filter((f) => f.id != food.id);
    } catch (err) {
      console.log(err);
    }
  }

  selectFood(food: Food) {
    this.foodForm.patchValue(food);
    this.foodForm.patchValue({ partner: food.partner.id });
    this.modifyEnabled = true;
  }
}
