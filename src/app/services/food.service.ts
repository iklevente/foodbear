import { Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';

import {
  HttpClient
} from '@angular/common/http';
import { Food } from '../models/Food';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseService<Food>{

  constructor(http: HttpClient) { 
    super(http, "food");
  }
}
