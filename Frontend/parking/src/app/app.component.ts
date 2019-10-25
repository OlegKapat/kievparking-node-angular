import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'parkingUA';
   constructor(private auth:AuthService){}

  ngOnInit(){
    const potentialTokenForUser=localStorage.getItem('auth-token')
    if(potentialTokenForUser !==null){
      this.auth.setToken(potentialTokenForUser)
    }
  }
   deleteSession(){
     localStorage.clear();
   }
}
