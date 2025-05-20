import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partner } from '../models/Partner';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PartnerService extends BaseService<Partner> {
  constructor(http: HttpClient) {
    super(http, 'partner');
  }
}
