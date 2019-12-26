import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {AdminRoutingModule} from './admin-routing.module';
import { ParkingComponent } from './parking/parking.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OwnerparkingComponent } from './ownerparking/ownerparking.component';
import { DatePipe } from './shared/pipes/date.pipe';
import { SiteuserComponent } from './siteuser/siteuser.component';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  exports:[ReactiveFormsModule,FormsModule,CommonModule],
  declarations: [ParkingComponent, OwnerparkingComponent, DatePipe, SiteuserComponent,LoaderComponent,AdminComponent ]
})
export class AdminModule { }
