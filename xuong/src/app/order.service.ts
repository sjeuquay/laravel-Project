import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: any = {};
  constructor(private router: Router) {}
  
  setOrder(user: any) {
    this.order = user;
  }
  getOrder(){
    return this.order;
  }
}
