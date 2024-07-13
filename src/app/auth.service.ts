import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  register(data: any): Observable<any> {
    return this.http.post('/api/register', data);
  }

  login(data: any): Observable<any> {
    return this.http.post('/api/login', data);
  }

  // logout() {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
        // this.router.navigate(['/login']); 
  // }
}