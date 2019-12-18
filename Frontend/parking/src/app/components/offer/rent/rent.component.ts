import { switchMap } from 'rxjs/operators';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest, Observable,fromEvent, of } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {InfoService} from '../../../shared/services/info.service'
import {MaterialService,MaterialInstance, MaterialDatepicker} from '../../../shared/classes/material.service'
import { Rent, Application } from './../../../shared/interfaces/interfaces';
import { } from 'googlemaps';
import { RentService } from 'src/app/shared/services/rent.service';
import * as moment from 'moment'
import { ApplocationService } from 'src/app/shared/services/applocation.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit,AfterViewInit{
  @ViewChild('selectcity',{static:false}) cityRef:ElementRef;
  @ViewChild('selectdistrict',{static:false}) districtRef:ElementRef;
  @ViewChild('selectstreet', {static:false}) streetRef:ElementRef;
  @ViewChild('mapRef', {static: false}) gmap: ElementRef;
  @ViewChild('rent',{static:false}) rentRef:ElementRef;
  @ViewChild('picker3',{static:false}) from:ElementRef
  @ViewChild('picker4',{static:false}) to:ElementRef

  selectstreet:MaterialInstance;
  infocard:MaterialInstance;
  rentpage:MaterialInstance;
  city:string[];
  district:string[];
  street:string;
  parkingItem:Application[];
  newdata:any[]=[];
  tempalateParam:string;
  userId:string
  map: google.maps.Map;
  geocoder:any;
  rentForm:FormGroup;
  start:MaterialDatepicker;
  end:MaterialDatepicker;
  isValid:boolean;
  isDateValidFrom;isDateValidTo:boolean;
  formForSend:Rent={
    termstatus:false,
    confirmstatus:false,
    start:null,
    end:null,
    parkingForRentId:''
  }
  parkingForRentId:string
  parkingLength:number;
  getAllUnconfirmedParkings:Rent[];

  constructor( private infoservice:InfoService, private router:Router,
              private rentservice:RentService, private applicationservice:ApplocationService) {}

  ngOnInit() {
    this.geocoder=new google.maps.Geocoder()
    combineLatest(this.infoservice.getcity(),this.infoservice.getdistrict()).subscribe((data:[string[],string[]])=>{
      this.city=data[0],
      this.district=data[1]
    }),error=>MaterialService.toast(error)
    this.rentForm=new FormGroup({
      termstatus:new FormControl(''),
      confirmstatus:new FormControl(''),
      from:new FormControl('',Validators.required),
      to:new FormControl('',Validators.required)
    })
  }
   ngAfterViewInit(){
    this.mapInitializer()
    MaterialService.updateTextInput()
    MaterialService.initSelect(this.cityRef)
    MaterialService.initSelect(this.districtRef)
    this.selectstreet=MaterialService.initSelect(this.streetRef);
    this.rentpage=MaterialService.initModal(this.rentRef)
    this.start= MaterialService.initDatepicker(this.from ,this.validate.bind(this))
    this.end= MaterialService.initDatepicker(this.to,this.validate.bind(this))
    fromEvent(this.from.nativeElement,'change').pipe(switchMap(()=>{return this.applicationservice.getApplicationById(this.parkingForRentId)})).subscribe((e)=>{
      if(moment(e.from).format('DD.MM.YYYY')<=this.from.nativeElement.value )
       {
         this.isDateValidFrom=false
       }
       else{
           this.isDateValidFrom=true
       }
     }
     )
     fromEvent(this.to.nativeElement,'change').pipe(switchMap(()=>{return this.applicationservice.getApplicationById(this.parkingForRentId)})).subscribe((s)=>{
      if(moment(s.to).format('DD.MM.YYYY')>=this.to.nativeElement.value )
       {
         this.isDateValidTo=false
       }
       else{
           this.isDateValidTo=true
       }
     }
     )

  }
  findAddress(event){
    this.infoservice.selectaddress({itemDistrict:event.target.value}).subscribe((data)=>
    {
      let streetdata=[]
      data.forEach(somedata=>{streetdata.push(somedata.street)});
      this.newdata=streetdata.filter((item,index)=>streetdata.indexOf(item)===index)
    }
    ),error=>MaterialService.toast(error)
  }
   findPlace(event){
    this. tempalateParam=event.target.value

    if(this.tempalateParam){
      this.infoservice.selectoneparking(this.tempalateParam).subscribe((data)=>{this.parkingItem=data.oneparking,this.parkingLength=this.parkingItem.length
      }),
      error=>console.error(error.error.message);

    }
    this.mapInitializer()
   }
   mapInitializer() {
    const mapProperties = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      };
     this.map = new google.maps.Map(this.gmap.nativeElement,mapProperties);
     if(this.geocoder){
       this.geocoder.geocode({'address':this.tempalateParam},(res,status)=>{
         if(status==google.maps.GeocoderStatus.OK){
           if(status != google.maps.GeocoderStatus.ZERO_RESULTS){
            this.map.setCenter(res[0].geometry.location);
            var infowindow = new google.maps.InfoWindow(
              { content: '<b>'+this.tempalateParam+'</b>'
              });

          var marker = new google.maps.Marker({
              position: res[0].geometry.location,
              map: this.map,
              title:this.tempalateParam
          });
              google.maps.event.addListener(marker, 'click', ()=> {
              infowindow.open(this.map,marker);
          });
           }
         }
       })
     }
  }
  openrentmodal(id){
    this.parkingForRentId=id;
    this.rentpage.open()
    this.rentservice.getAllStatus(this.parkingForRentId).subscribe((data)=>{this.getAllUnconfirmedParkings=data,console.log(this.getAllUnconfirmedParkings);

    },
    error=>MaterialService.toast("Неможливо вибрати"+ error.error.message)
    )
  }
  validate(){
    if(this.start.date|| this.end.date){
        this.isValid=false;

    }
    else if (!this.start.date || !this.end.date ) {
      this.isValid=true;
    }

    this.isValid=this.start.date<this.end.date;

    }
  onSubmit(){
    this.rentservice.addRent(this.formForSend={
      termstatus:false,
      confirmstatus:false,
      start:this.start.date,
      end:this.end.date,
      parkingForRentId:this.parkingForRentId
    }).subscribe(()=>{MaterialService.toast("Запит прийнятий в обробку")


    },error=>MaterialService.toast("Помилка запиту " + error.error.message)),
    this.rentpage.close()
  }
  closeform(){
    this.rentpage.close();
  }

}


