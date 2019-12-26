import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ApplocationService } from '../../shared/services/applocation.service'
import { MaterialService, MaterialInstance, MaterialDatepicker } from 'src/app/shared/classes/material.service';
import {InfoService} from '../../shared/services/info.service'



@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit,AfterViewInit,OnDestroy{
  owner:boolean=false;
  aSub:Subscription;
  itemDistrict:string
  constructor(private router:Router, private applicatioService:ApplocationService) {
   }

  ngOnInit() {
  //this.activeroute.queryParams.subscribe(queryParams=>this.owner=queryParams['owner'])
   this.owner=JSON.parse(localStorage['owner'])
  }
  ngAfterViewInit(){
    this.router.events.subscribe((evet)=>{})
  }
  submitForm(data){
   this.aSub=this.applicatioService.addApplication(data).subscribe(()=>{
     MaterialService.toast("Заявку подано")

   }, error=>{MaterialService.toast(error.error.message)}

   )
  }
  ngOnDestroy(){
      if(this.aSub){
        this.aSub.unsubscribe()
      }
  }

}
