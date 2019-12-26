
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MaterialService} from '../../shared/classes/material.service'
import { ContactService } from 'src/app/shared/services/contact.service';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { Contact } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup
  constructor(private contactservice:ContactService) { }

  ngOnInit() {
    MaterialService.updateTextInput
    this.contactForm=new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email]),
      name:new FormControl('',Validators.required),
      phone:new FormControl(''),
      text:new FormControl('',Validators.required)
    })

  }

  onSubmitContact(){
    this.contactservice.sendMessage(this.contactForm.value).subscribe((res:Contact)=>{
    })
    this.contactForm.reset()

  }

}

