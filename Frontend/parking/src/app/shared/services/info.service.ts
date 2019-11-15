
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,from,of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Application } from './../interfaces/interfaces';
import {User} from '../interfaces/interfaces'


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  parkingCity:string[]=["Київ"]
  parkingDistrict:string[]=["Деснянский","Святошинський","Дніпровський","Печерський","Голосіївський","Дарницький","Солом'янський","Оболонський","Шевченківський","Подільський"]

  constructor(private http:HttpClient) { }

  getcity():Observable<string[]>{
    return from([this.parkingCity])
  }
  getdistrict():Observable<string[]>{
    return from([this.parkingDistrict])
  }
  getstreet(item):Observable<Application[]>{
    return from([item])
  }
  selectaddress(item):Observable<Application[]>{
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json")
    headers.append("accept","application/json")
    return this.http.post<Application[]>(`/api/applicant/getstreet`,item,{headers})
  }
  selectoneparking(street):Observable<any>{
    return this.http.get<any>(`api/applicant/getone/${street}`)
  }
}
