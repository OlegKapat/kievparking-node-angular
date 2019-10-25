import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingService } from '../shared/services/parking.service';
import { User } from 'src/app/shared/interfaces/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-siteuser',
  templateUrl: './siteuser.component.html',
  styleUrls: ['./siteuser.component.css']
})
export class SiteuserComponent implements OnInit {

  parkingUser$:Observable<User[]>
  constructor(private parkingservice:ParkingService) { }

  ngOnInit() {
    this.parkingUser$=this.parkingservice.getUser()
  }
  deleteUser(id){
    this.parkingservice.deleteUser(id).subscribe(()=>{MaterialService.toast("Користувач видалений")})
  }

}
