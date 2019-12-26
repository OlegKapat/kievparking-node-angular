import { ParkingService } from './../shared/services/parking.service';
import { User} from '../../../shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ownerparking',
  templateUrl: './ownerparking.component.html',
  styleUrls: ['./ownerparking.component.css']
})
export class OwnerparkingComponent implements OnInit,OnDestroy {
  parkingOwner$:Observable<User[]>
  private unSubscribe=new Subject();
  constructor(private parkingservice:ParkingService) { }

  ngOnInit() {
    this.parkingOwner$=this.parkingservice.getOwner()
  }
  ngOnDestroy(){
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
  deleteUser(id){
    this.parkingservice.deleteUser(id).pipe(takeUntil(this.unSubscribe)).subscribe(()=>{MaterialService.toast("Користувач видалений")})
  }
}
