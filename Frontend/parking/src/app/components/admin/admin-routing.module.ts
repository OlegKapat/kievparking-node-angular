import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent } from './admin.component';
import {ParkingComponent} from './parking/parking.component'
import {OwnerparkingComponent} from './ownerparking/ownerparking.component'
import {SiteuserComponent} from './siteuser/siteuser.component'

const routes:Routes=[
  {path:'',component:AdminComponent},
  {path:"admin", component:AdminComponent, children:[
    {path:'parking',component:ParkingComponent},
    {path:'owner',component:OwnerparkingComponent},
    {path:'siteuser',component:SiteuserComponent}
  ]}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]

})
export class AdminRoutingModule { }
