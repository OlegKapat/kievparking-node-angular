import { Rent } from './../interfaces/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http:HttpClient) { }

  addRent(rentForm:Rent):Observable<any>{
    return this.http.post<Rent>('/api/rent/addrent',rentForm)
  }
  getRentId(id):Observable<Rent[]>{
    return this.http.get<Rent[]>(`/api/rent/getrent/${id}`)
  }
}
