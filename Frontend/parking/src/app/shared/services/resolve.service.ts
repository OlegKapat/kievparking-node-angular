import { Observable,of } from 'rxjs';
import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router'
import { delay } from 'rxjs/operators';
import { ParkingService } from 'src/app/components/admin/shared/services/parking.service';



@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any>{

  constructor(private parkingservice:ParkingService) { }
  resolve(router:ActivatedRouteSnapshot){
    return this.parkingservice.getOneData(router.paramMap.get('id'))
  }
}
