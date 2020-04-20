import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms'
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
  signupSuccess: Boolean;

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'password':new FormControl(null)
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
        console.log(error)
      },
      ()=>{
        this.signupSuccess=true;
      }
      )

  }
}
