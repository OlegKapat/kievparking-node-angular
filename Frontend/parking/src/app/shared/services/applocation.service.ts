import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../interfaces/interfaces';



@Injectable({
  providedIn: 'root'
})
export class ApplocationService {

  constructor(private http:HttpClient) { }
  addApplication(app:Application):Observable<any>{
    return this.http.post<any>('/addApplication',app)

  }
}
