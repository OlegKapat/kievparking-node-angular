import { Parking } from './../interfaces/parking';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private http:HttpClient) { }

   saveData(data:any,image?:File):Observable<Parking>{
     let fd=new FormData();
     fd.append('city',data.city),
     fd.append('district',data.district),
     fd.append('street',data.street),
     fd.append('building',data.building),
     fd.append('numberOfPlace',data.numberOfPlace),
     fd.append('information', data.information),
     fd.append('security',data.security),
     fd.append('image',image,data.imageSrc)


    return this.http.post<Parking>('/api/admin/parking',fd)

  }
  getData():Observable<Parking[]>{
    return this.http.get<Parking[]>('/api/admin/getparking');
  }
 getOneData(id):Observable<Parking>{
   return this.http.get<Parking>(`/api/admin/getoneparking/${id}`)
 }
 deleteParking(id):Observable<Parking>{
   return this.http.delete<Parking>(`/api/admin/deleteparking/${id}`)
 }
 getOwner():Observable<User[]>{
     return this.http.get<User[]>('/api/auth/getowner')

 }
 getUser():Observable<User[]>{
   return this.http.get<User[]>('/api/auth/getuser')
 }
 deleteUser(id):Observable<User>{
   return this.http.delete<User>(`/api/auth/deleteuser/${id}`)
 }

}
