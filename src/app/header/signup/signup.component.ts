import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private http: HttpClient,
              private auth: AuthService,
              private router: Router){ }

  signupForm: FormGroup;
  signupSuccess: String=null;

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      'username': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required])
    });

  }

  onSubmit(){
    
    let postData={
      username:this.signupForm.value.username,
      email: this.signupForm.value.email,
      password:this.signupForm.value.password
    }

    console.log(postData);

    this.auth.signup(postData).subscribe(responseData =>{
        console.log(responseData)
      },
      (error)=>{
        this.signupSuccess="no";
        console.log(error)
      },
      ()=>{
        this.signupSuccess="yes";
      }
      )

  }
}
