import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css'],
})
export class AddPartnerComponent implements OnInit {
  partnerForm: FormGroup;
  serversideError: boolean = false;
  modifyEnabled: boolean = false;
  partners: Partner[] = [];

  constructor(public partnerService: PartnerService, public fb: FormBuilder) {
    this.partnerForm = this.fb.group({
      id: [null],
      name: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur',
        },
      ],
      tel: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^\+?[0-9]{4,}$/),
          ],
          updateOn: 'blur',
        },
      ],
      taxNumber: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11),
          ],
          updateOn: 'blur',
        },
      ],
      address: [
        '',
        {
          validators: [Validators.required, Validators.minLength(5)],
          updateOn: 'blur',
        },
      ],
      foods: [[]],
    });
  }
  async ngOnInit(): Promise<void> {
    try {
      this.partners = await this.partnerService.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  async addPartner() {
    try {
      this.partnerForm.patchValue({ id: null });
      const newPartner = await this.partnerService.create(
        this.partnerForm.value
      );
      this.serversideError = false;
      this.partners.push(newPartner);
    } catch (err) {
      console.log(err);
      this.serversideError = true;
    }
  }

  async updatePartner() {
    try {
      const updatedPartner = await this.partnerService.update(
        this.partnerForm.value
      );
      this.partners = this.partners.map((p) =>
        p.id === updatedPartner.id ? updatedPartner : p
      );
    } catch (err) {
      console.log(err);
    }
  }

  async deleteParnter(parter: Partner) {
    try {
      if (
        document
          .getElementById(parter.id.toString())
          ?.classList.contains('selected')
      ) {
        this.partnerForm.reset();
        this.modifyEnabled = false;
      }
      await this.partnerService.delete(parter.id);

      this.partners = this.partners.filter((p) => p.id !== parter.id);
    } catch (err) {
      console.log(err);
    }
  }

  modifyPartner(partner: Partner) {
    this.modifyEnabled = true;
    const classes = [
      'selected',
      'border',
      'border-warning',
      'rounded',
      'border-3',
    ];
    this.partnerForm.patchValue(partner);
    document.querySelector('.selected')?.classList.remove(...classes);
    let selected = document.getElementById(partner.id.toString());
    selected?.classList.add(...classes);
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null;
  }
}
