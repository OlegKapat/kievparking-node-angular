
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Manager } from './shared/interfaces/parking';
import { Subject, Observable, iif } from 'rxjs';
import { takeUntil, switchMap, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],

})
export class AdminComponent implements OnInit,AfterViewInit,OnDestroy {

  @ViewChild('loginadmin',{static:true})   loginAdminRef:ElementRef
  private unSubscribe=new Subject();
  managerForm:FormGroup;
  loginvalidator:boolean=false;
  loginModal:MaterialInstance;
  $potok:Observable<any>

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    MaterialService.updateTextInput
    this.managerForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  ngAfterViewInit(){
    this.loginModal=MaterialService.initModal(this.loginAdminRef)
    this.loginModal.open()
  }
  onLoginManeger(){
    this.auth.getManagerLogin(this.managerForm.get('name').value,this.managerForm.value).pipe(takeUntil(this.unSubscribe)).subscribe((value:Manager)=>{this.loginvalidator=value.password
        if(value.password){
          MaterialService.toast("Повезло")
          this.loginModal.close();
        }
    },error=>MaterialService.toast(error.error.message)
    )

  }
  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
  send(){
    this.router.navigate(['/'])
  }
}

