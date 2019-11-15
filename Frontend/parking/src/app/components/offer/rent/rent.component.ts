
import { Application } from './../../../shared/interfaces/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {InfoService} from '../../../shared/services/info.service'
import {MaterialService,MaterialInstance} from '../../../shared/classes/material.service'
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit,AfterViewInit{
  @ViewChild('selectcity',{static:false}) cityRef:ElementRef;
  @ViewChild('selectdistrict',{static:false}) districtRef:ElementRef;
  @ViewChild('selectstreet', {static:false}) streetRef:ElementRef;


  selectstreet:MaterialInstance;
  infocard:MaterialInstance;
  city:string[];
  district:string[];
  street:string;
  parkingItem:any[];
  newdata:any[]=[];
  tempalateParam:string;


  constructor( private infoservice:InfoService, private router:Router) {}

  ngOnInit() {
    combineLatest(this.infoservice.getcity(),this.infoservice.getdistrict()).subscribe((data:[string[],string[]])=>{
      this.city=data[0],
      this.district=data[1]
    }),error=>MaterialService.toast(error)


  }
  ngAfterViewInit(){
    MaterialService.updateTextInput()
    MaterialService.initSelect(this.cityRef)
    MaterialService.initSelect(this.districtRef)
    this.selectstreet=MaterialService.initSelect(this.streetRef)
  }
  findAddress(event){
    this.infoservice.selectaddress({itemDistrict:event.target.value}).subscribe((data)=>
    {
      let streetdata=[]
      data.forEach(somedata=>{streetdata.push(somedata.street)});
      this.newdata=streetdata
    }
    ),error=>MaterialService.toast(error)
  }
   findPlace(event){
    this. tempalateParam=event.target.value
    if(this.tempalateParam){
      this.infoservice.selectoneparking(this.tempalateParam).subscribe((data)=>{this.parkingItem=data}),
      error=>console.error(error)
    }
   }

  }


