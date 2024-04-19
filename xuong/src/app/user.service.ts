import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = {};
  constructor(private router: Router) {}
  
  setUser(user: any) {
    this.user = user;
    this.getUser();
  }
  getUser(){
    return this.user;
  }
  logOut(){
    this.user = {};
    this.router.navigate(['/dangnhap']);
  }
  isLogin(){
    return this.user.id ? true : false;
  }
}