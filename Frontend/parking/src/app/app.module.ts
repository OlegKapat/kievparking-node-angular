import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminModule } from './components/admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/classes/tokeninterceptor';
import { OfferComponent } from './components/offer/offer.component';
import { ApplicantsComponent } from './components/offer/applicants/applicants.component';
import { RentComponent } from './components/offer/rent/rent.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    OfferComponent,
    ApplicantsComponent,
    RentComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,multi:true,useClass:TokenInterceptor}
  ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
