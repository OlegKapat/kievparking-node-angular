import { Injectable } from '@angular/core';
import {User} from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {tap, catchError} from 'rxjs/operators'
import { Parking } from 'src/app/components/admin/shared/interfaces/parking';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token=null;
  private owner:boolean;
  name:string

  constructor(private http:HttpClient) { }

  login(user:User):Observable<{token:string,owner:boolean,userId:string,name:string}> {
     return this.http.post<{token:string,owner:boolean,userId:string,name:string}>('/api/auth/login',user).pipe(tap(({token,owner,userId,name})=> {
        localStorage.setItem('auth-token',token);
        this.setToken(token);
        this.setOwner(owner);
        name;

     }))



  }
  setToken(token:string){
     this.token=token;
  }
  setOwner(owner:boolean){
     this.owner=owner;
  }
  getOwner():boolean{
    return this.owner;
  }
  getToken():string {
     return this.token;
  }
  isAuthenticated():boolean{
    return !!this.token
  }
  logOut(){
    this.setToken(null)
    localStorage.clear()
  }
  registration(user:User,selectedAddress:string,selectedId:string,image?:File):Observable<User> {
     
      const fd:any=new FormData();
      if(user.owner){
        fd.append('email',user.email)
        fd.append('password',user.password)
        fd.append('owner',user.owner)
        fd.append('name',user.name)
        fd.append('address',selectedAddress)
        fd.append('phone',user.information.phone)
        fd.append('city',user.information.city)
        fd.append('district',user.information.district)
        fd.append('place',user.information.place),
        fd.append('parkingId', selectedId)
        fd.append('image', image, user.information.imageSrc)
      } else{
        fd.append('name',user.name)
        fd.append('email',user.email)
        fd.append('password',user.password)
        fd.append('owner',false)
      }

      return this.http.post<User>('/api/auth/register',fd).pipe(catchError(error=>{
        return throwError(error)
      }))
  }
  getData():Observable<Parking[]>{
    return this.http.get<Parking[]>('/api/auth/getparkingRegister').pipe(catchError(error=>{return throwError(error)}));
  }
}
