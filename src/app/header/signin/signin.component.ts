import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  signinError:String;
  invalidLogin:Boolean
  error:any
  
  constructor( private http: HttpClient,
               private auth: AuthService,
               private router:Router,
               private route: ActivatedRoute) { 

                this.invalidLogin=false;
               }

 
  ngOnInit(): void {
    this.signinForm=new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password':new FormControl(null,Validators.required)
    });

  }

  onSubmit(){
    
    let postData={
      username:this.signinForm.value.username,
      password:this.signinForm.value.password
    }


    this.auth.signin(postData).subscribe(
    (res)=>{
      this.auth.setAuthToken(res.headers.get("Authorization"))
    },
    (error)=>{
      this.error=error;
      console.log(error)
      this.invalidLogin=true;
    },
    ()=>{
      this.auth.setUsername(postData.username);
      this.auth.loggedIn.next(true);
      this.router.navigate(['../','products','search']);
    }
    )
  }
}
