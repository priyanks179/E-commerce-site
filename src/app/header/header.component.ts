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

  ngOnInit(): void {
   this.auth.loggedIn.subscribe((data)=>{
     this.isLoggedIn$=data;
      console.log(data);
   })
  }

  ngOnDestroy() {
    this.auth.loggedIn.unsubscribe();
  }

  onLogOut(){
    this.auth.setAuthToken(null);
    this.auth.loggedIn.next(false);
    this.router.navigate(['signup']);
    this.router.navigate(['../','products','search']);

  }

}
