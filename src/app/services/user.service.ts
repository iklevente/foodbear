import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  public async getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`/api/users`).subscribe((res: any) => {
        return resolve(res);
      });
    });
  }
}
