import { Injectable } from '@angular/core';
import { User } from '../models/User';

import { lastValueFrom, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = '/api'; //
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser!: User | null;

  constructor(private http: HttpClient, public router: Router) {}

  signUp(user: User): Observable<any> {
    return this.http.post('/api', user).pipe(catchError(this.handleError));
  }

  signIn(user: User) {
    const loginUser$ = this.http.post<any>(`/api/login`, user).pipe(
      switchMap((res: any) => {
        localStorage.setItem('access_token', res.token);
        return this.getUserProfile();
      })
    );

    const saveCredentials$ = loginUser$.pipe(
      switchMap((userProfile: any) => {
        this.currentUser = userProfile;
        return of(userProfile);
      })
    );

    return saveCredentials$;
  }

  getCurrentUserID() {
    return this.currentUser!.id;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = localStorage.getItem('access_token');
      this.http.get<boolean>(`/api/token`).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          resolve(false);
        }
      );
    });
  }

  public isAdmin() {
    return lastValueFrom(this.http.get<boolean>(`/api/user/isadmin`)).catch(
      (err) => {
        return false;
      }
    );
  }

  async getCurrentUser(): Promise<User> {
    if (this.currentUser == null) {
      this.currentUser = await lastValueFrom(this.http.get<User>(`/api/user`));
    }
    return this.currentUser;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
      this.currentUser != null;
    }
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>('/api/user', { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),

      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

  addUser(user: User) {
    return lastValueFrom(this.http.post(`/api/createuser`, user));
  }

  deleteUser(id: number) {
    this.http.delete(`/api/users/${id}`).subscribe(
      (res) => {},
      (err) => {
        alert('A saját profilod nem tudod törölni.');
        throwError(err);
      }
    );
  }
}
