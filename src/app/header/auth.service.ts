import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Authorization:String
  username:String
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  signin(postData){
    return this.http
    .post<any>('http://localhost:8001/login', postData, { observe: 'response'});
  }    

  signup(postData){
    return  this.http.post('http://localhost:8001/users',postData);
  }


  setAuthToken(token:String){
    this.Authorization=token;
  }
  getAuthToken(){
    return this.Authorization
  }

  setUsername(username: String) {
    this.username=username;
  }

  getUsername() {
    return this.username;
  }
}
