import { ParkingService } from './../shared/services/parking.service';
import { User} from '../../../shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-ownerparking',
  templateUrl: './ownerparking.component.html',
  styleUrls: ['./ownerparking.component.css']
})
export class OwnerparkingComponent implements OnInit {
  parkingOwner$:Observable<User[]>
  constructor(private parkingservice:ParkingService) { }

  ngOnInit() {
    this.parkingOwner$=this.parkingservice.getOwner()
  }
  deleteUser(id){
    this.parkingservice.deleteUser(id).subscribe(()=>{MaterialService.toast("Користувач видалений")})
  }
}
