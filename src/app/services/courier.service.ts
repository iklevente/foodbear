import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Courier } from '../models/Courier';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService extends BaseService<Courier>{

  constructor(http:HttpClient) { 
    super(http, "courier");
  }
}
