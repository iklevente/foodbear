import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
})
export class PartnerListComponent implements OnInit {
  partners!: Partner[];

  constructor(private partnerService: PartnerService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.partners = await this.partnerService.getAll();
    } catch (err) {
      console.log(err);
    }
  }
}
