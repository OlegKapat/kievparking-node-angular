import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter, Application } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplocationService {

  constructor(private http:HttpClient) { }
  addApplication(app:any):Observable<any>{
    return this.http.post<any>('/api/applicant/addapplication',app)

  }
  getApplicationById(id):Observable<Application>{
    return this.http.get<Application>(`/api/applicant/getapplication/${id}`)
  }
}
