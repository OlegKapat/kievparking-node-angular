
import { Component, OnInit,ViewChild,ElementRef,AfterViewInit,OnDestroy, AfterContentInit, ChangeDetectionStrategy, OnChanges, Input} from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import {MaterialService,MaterialInstance} from '../../shared/classes/material.service';
import { AuthService } from './../../shared/services/auth.service';
import * as M from "materialize-css";
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ParkingService } from '../admin/shared/services/parking.service';
import { Parking } from '../admin/shared/interfaces/parking';
import { switchMap,tap } from 'rxjs/operators';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit,AfterViewInit,OnDestroy,AfterContentInit {
  options={};
  @ViewChild('modalEnter',{static:false}) modalenterRef:ElementRef;
  @ViewChild('login',{static:false}) loginRef:ElementRef;
  @ViewChild('registration',{static:false}) registrationRef:ElementRef;
  @ViewChild('input',{static:false}) inputRef:ElementRef;
  @ViewChild('select',{static:true}) selectRef:ElementRef;
  @ViewChild('selectcity',{static:true}) selectcityRef:ElementRef;
  @ViewChild('selectdistrict',{static:true}) selectdistrictRef:ElementRef;
  @Input('item._id') setId:string
  info:string
  modal:MaterialInstance;
  modalLogin:MaterialInstance;
  modalRegister:MaterialInstance;
  image:File;
  imagePrevie: string | ArrayBuffer;
  loginForm:FormGroup;
  registrationForm:FormGroup;
  checkOwner:boolean;
  aSubLogin:Subscription;
  aSubRegister:Subscription;
  parkingItem:Parking[]=[];
  parkingAddress:Parking[]=[];
  selectedId:string
  selectedAddress:string;
  parkingCity:string[]=["Київ"]
  parkingDistrict:string[]=["Деснянский","Святошинський","Дніпровський","Печерський","Голосіївський","Дарницький","Солом'янський","Оболонський","Шевченківський","Подільський"]
  owner:boolean;
  name:string
  somedata:any

  constructor(private auth:AuthService, private activeroute:ActivatedRoute,
               private parkingService:ParkingService,private router:Router) { }

  ngOnInit() {
    MaterialService.updateTextInput()
   const elems = document.querySelectorAll('.parallax');
    const instances = M.Parallax.init(elems, this.options);
    this.loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)])
    })


    this.activeroute.queryParams.subscribe((params:Params)=> {
        if(params['registered']) {
            // Заходите в систему зі своїми данними
        MaterialService.toast("Раді вас вітати на нашoму сайті")
        } else if (params['accessDinied']) {
        MaterialService.toast("Для початку роботи треба авторизуватись")
        } else if(params['sessionFailed']){
          MaterialService.toast("Поточна сессія закінчилась")
        } else if(params['login']){
          MaterialService.toast('Вітаємо вас')

        }
    })

    this.checkOwner=false;
    this.registrationForm=new FormGroup({
       name:new FormControl(null,Validators.required),
       email:new FormControl(null,[Validators.required,Validators.email]),
       password:new FormControl(null,[Validators.required,Validators.min(6)]),
       owner:new FormControl(),
       information:new FormGroup({
       imageSrc:new FormControl(),
       city:new FormControl('',Validators.required),
       district:new FormControl('',Validators.required),
       address:new FormControl('',Validators.required),
       phone:new FormControl('',Validators.required),
       parkingId:new FormControl('11111111'),
       place:new FormControl('',[Validators.required,Validators.pattern(/^(\d){1,2}$/)])
       })
    })

  }
  ngAfterViewInit(){
    MaterialService.updateTextInput();
    this.modal=MaterialService.initModal(this.modalenterRef);
    this.modalLogin=MaterialService.initModal(this.loginRef);
    this.modalRegister=MaterialService.initModal(this.registrationRef);
    MaterialService.initSelect(this.selectRef);
    MaterialService.initSelect(this.selectcityRef);
    MaterialService.initSelect(this.selectdistrictRef);
  }

   firstEnter(){
     this.modal.open();
   }
   openYes(){
     this.modal.close();
     this.modalLogin.open();
   }
   openNo(){
     this.modal.close();
     this.modalRegister.open();
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
  close(){
    //this.auth.logOut()
    this.modalRegister.close();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false; // перегрузка основної сторінки
      };

  }
  onSubmitLogin(){
    this.aSubLogin=this.auth.login(this.loginForm.value).subscribe((data)=>{
      localStorage['owner']=JSON.stringify(data.owner)
      if(data){

        MaterialService.toast(`Вітаємо ${data.name}`)
        this.router.navigate(['/offer'],{queryParams:{
          login:true,
          owner:data.owner
       }})

      }

    },error=>MaterialService.toast("Невірний логін чи пароль"))

    this.modalLogin.close()
    this.loginForm.reset();
  }
  ngOnDestroy(){
    if(this.aSubLogin ) {
      this.aSubLogin.unsubscribe();
      }
      else if(this.aSubRegister){
        this.aSubRegister.unsubscribe()
      }
  }
  onSubmitRegister(){
    this. aSubRegister=this.auth.registration(this.registrationForm.value,this.selectedAddress, this.selectedId,this.image)
    .subscribe(()=>{
     this.router.navigate(['/'],{queryParams:{
      registered:true,

    }}),MaterialService.toast("Користувач створений")
    }
    ),error=>MaterialService.toast(`Проблеми з реєстрацією  ${error.error.message}`),
    this.registrationForm.reset()
    this.modalRegister.close();
  }
onChanges(){
  this.registrationForm.get('owner').valueChanges.pipe(tap(()=>{this.checkOwner=!this.checkOwner}),switchMap(()=> {
   return this.auth.getData() })).subscribe((data)=>{this.parkingAddress=data}),error=>MaterialService.toast(error.message)

}
ngAfterContentInit(){
  this.onChanges();

}
 getId(event){
     let select=event.target.value;
     let onevalue=select.split(",")
     this.selectedAddress=onevalue[0];
     this.selectedId=onevalue[1];

 }
}
