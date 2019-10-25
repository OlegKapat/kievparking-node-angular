import { FormGroup,FormControl } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MaterialService, MaterialInstance, MaterialDatepicker } from 'src/app/shared/classes/material.service';



@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit,AfterViewInit{
  owner:boolean=false;


  constructor(private activeroute:ActivatedRoute, private router:Router) {
   }

  ngOnInit() {
  //this.activeroute.queryParams.subscribe(queryParams=>this.owner=queryParams['owner'])
  this.owner=JSON.parse(localStorage['owner'])

  }
  ngAfterViewInit(){
    this.router.events.subscribe((evet)=>console.log(evet))


  }
  submitForm(event:Event){
    console.log(event);

  }

}
