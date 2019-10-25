
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MaterialService, MaterialDatepicker} from '../../../shared/classes/material.service'


@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild('picker1',{static:false}) from:ElementRef;
  @ViewChild('picker2',{static:false}) to:ElementRef;
  @Output() childSubmit=new EventEmitter()
  start:MaterialDatepicker;
  end:MaterialDatepicker;
  applicantForm:FormGroup;
  isValid=true;

  costructor() { }

  ngOnInit() {
   this.applicantForm=new FormGroup({
     name:new FormControl(),
     city:new FormControl(),
     discrict:new FormControl(),
     address:new FormControl(),
     place:new FormControl(),
     from:new FormControl('',Validators.required),
     to:new FormControl('',Validators.required)
   })


  }
  ngAfterViewInit(){
    this.start=MaterialService.initDatepicker(this.from,this.validate.bind(this))
    this.end=MaterialService.initDatepicker(this.to,this.validate.bind(this))
  }

    ngOnDestroy(){
      this.start.destroy()
      this.end.destroy();
    }
    validate(){
      if(this.start.date ===null || this.end.date===null){
          this.isValid=false;

      }
      else if (this.start.date !==null || this.end.date !==null) {
        this.isValid=true;
      }

      this.isValid=this.start.date<this.end.date;

      }
      onSubmit(){
        this.childSubmit.emit(this.applicantForm.value)
        console.log(this.applicantForm.value)
      }
}

