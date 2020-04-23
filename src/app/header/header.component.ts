import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy  {

  constructor(private auth:AuthService,
              private router: Router) {}

   isLoggedIn$ =false;
   userSub: Subscription
   username:String
   cartUrl:String=null;

  ngOnInit(): void {
   this.auth.loggedIn.subscribe((data)=>{
     this.cartUrl=`users/${this.auth.getUsername()}/product`
     this.isLoggedIn$=data;
     //console.log(this.auth.getUsername())
      console.log(data);
   })
  }

  ngOnDestroy() {
    this.auth.loggedIn.unsubscribe();
  }

  onLogOut(){
    this.auth.setAuthToken(null);
    this.auth.loggedIn.next(false);
    this.router.navigate(['signin']);
  }

}
