import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import { ParkingComponent } from './parking/parking.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OwnerparkingComponent } from './ownerparking/ownerparking.component';
import { DatePipe } from './shared/pipes/date.pipe';
import { SiteuserComponent } from './siteuser/siteuser.component';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ParkingComponent, OwnerparkingComponent, DatePipe, SiteuserComponent,LoaderComponent]
})
export class AdminModule { }
