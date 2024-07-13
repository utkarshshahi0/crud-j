import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>('/api/applications');
  }

  addApplication(data: any): Observable<any> {
    return this.http.post('/api/applications', data);
  }

  deleteApplication(id: number): Observable<any> {
    return this.http.delete(`/api/applications/${id}`);
  }
}
