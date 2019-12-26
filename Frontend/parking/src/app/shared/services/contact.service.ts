import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  sendMessage(contact):Observable<Contact>{
    console.log(contact);

    return this.http.post<Contact>('/api/contact/sendformemail', contact)
  }
}
