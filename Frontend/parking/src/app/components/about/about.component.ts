

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {MaterialService} from '../../shared/classes/material.service';
import * as M from "materialize-css";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit,AfterViewInit {
   @ViewChild('parallax1',{static:false}) parallaxRef1:ElementRef
   @ViewChild('parallax2',{static:false}) parallaxRef2:ElementRef
   @ViewChild('rules',{static:false}) rulesRef:ElementRef

  constructor() { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    MaterialService.initParalax(this.parallaxRef1)
    MaterialService.initParalax(this.parallaxRef2)
    MaterialService.initCollapsible(this.rulesRef)
  }

}
