
import { Subscription, Observable } from 'rxjs';
import { Parking } from './../shared/interfaces/parking';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MaterialService,MaterialInstance} from '../../../shared/classes/material.service'
import { ParkingService } from '../shared/services/parking.service';
import {Subject} from "rxjs";
import {takeUntil} from 'rxjs/Operators'

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit,AfterViewInit,OnDestroy {
   addresslist:string[]=["Київ"];
   districts:string[]=["Деснянський","Святошинський","Дніпровський","Печерський","Голосіївський","Дарницький","Солом'янський","Оболонський","Шевченківський","Подільський"];
   security:string[]=["Денна","Нічна","Цілодобово"];
   @ViewChild('select',{static:true}) selectRef:ElementRef;
   @ViewChild('selectdistrict',{static:true}) districtRef:ElementRef;
   @ViewChild('selectsecurity',{static:true}) securityRef:ElementRef;
   @ViewChild('input',{static:true}) inputRef:ElementRef;
   @ViewChild('tabs',{static:true}) tabsRef:ElementRef;
   @ViewChild('card',{static:true}) cardRef:ElementRef;
   parkingList$:Observable<Parking[]>;
   isNew:boolean=false
   image:File;
   imagePrevie: string | ArrayBuffer;
   parkingForm:FormGroup;
   card:MaterialInstance;
   aSub:Subscription;
   parkingItem:Parking;
   city;street;rayon;ohrana;info:string;
   imageParking:string | ArrayBuffer
   house;numberOfBuilding:number;
   private unSubscribe=new Subject();
   getOneParking:Subscription;
   deleteParking:Subscription;
   currentId:string;

   constructor( private parkingService:ParkingService) { }

  ngOnInit() {
    this.parkingForm=new FormGroup({
      city:new FormControl('',Validators.required),
      district:new FormControl('',Validators.required),
      street:new FormControl('',Validators.required),
      building:new FormControl('',Validators.required),
      numberOfPlace:new FormControl('',Validators.required),
      information:new FormControl('',Validators.required),
      security:new FormControl(''),
      imageSrc:new FormControl('')
    })

      this.parkingList$= this.parkingService.getData();

  }
   ngAfterViewInit(){
    MaterialService.initSelect(this.selectRef);
    MaterialService.initSelect(this.districtRef);
    MaterialService.initSelect(this.securityRef);
    this.card=MaterialService.initModal(this.cardRef);

   }
   onFileUpload(event:any){
    const file=event.target.files[0];
    this.image=file;

    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePrevie=reader.result
    }
    reader.readAsDataURL(file);
 }
    triggerClick(){
   this.inputRef.nativeElement.click();
   }
   onSubmit(){
     const data=this.parkingForm.value;
     this.aSub= this.parkingService.saveData(data,this.image).pipe(takeUntil(this.unSubscribe)).subscribe(()=>MaterialService.toast("Нова адреса добавлена")),error=>MaterialService.toast('Щось пішло не так'+`${error.error.message}`)
     this.resetForm()
   }
   resetForm(){
    this.parkingForm.reset()
    this.imagePrevie=null;
    MaterialService.initSelect(this.selectRef);
    MaterialService.initSelect(this.districtRef);
    MaterialService.initSelect(this.securityRef);

   }
   ngOnDestroy(){
     this.unSubscribe.next();
     this.unSubscribe.complete();
   }
   showAddForm(){
     this.isNew=!this.isNew
   }
   getItem(id){
     this.currentId=id;
    this.card.open();
    this.getOneParking=this.parkingService.getOneData(id).pipe(takeUntil(this.unSubscribe)).subscribe((data:Parking)=>{
    this.city=data.city;
    this.street=data.street;
    this.rayon=data.district;
    this.numberOfBuilding=data.numberOfPlace;
    this.info=data.information;
    this.ohrana=data.security;
    this.imageParking=data.imageSrc;
    }),error=>MaterialService.toast(error.error.message)


   }
  close(){
    this.card.close();
  }
  deleteItem(){
   this.deleteParking= this.parkingService.deleteParking(this.currentId).pipe(takeUntil(this.unSubscribe)).subscribe(()=>MaterialService.toast("Парінг видалено")),
    error=>MaterialService.toast("Помилка видалення" + error.error.message),this.close()
  }

}

