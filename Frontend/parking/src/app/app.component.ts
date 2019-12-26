import { MaterialService } from './shared/classes/material.service';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { filter,map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class   AppComponent implements OnInit {
  title = '';
   constructor(private auth:AuthService, private titleService:Title,
               private router: Router,private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    const potentialTokenForUser=localStorage.getItem('auth-token')
    if(potentialTokenForUser !==null){
      this.auth.setToken(potentialTokenForUser)
    }
     this.titleService.setTitle("Паркінг Сервіс");


  }

   deleteSession(){
     localStorage.clear();
   }
}
