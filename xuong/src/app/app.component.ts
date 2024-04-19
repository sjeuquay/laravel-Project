import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserInterface } from './user-interface';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cart: any = [];
  // user: any = {};
  title = 'xuong';
  productService: ProductService = inject(ProductService);
  userService: UserService = inject(UserService);
  
  user = this.userService.getUser();
  constructor(private router: Router) {
   }

  ngOnInit(): void {
    this.cart = this.productService.getCart();
    console.log(this.user);
  }

  // logout():void {
  //   this.user = [];
  //   this.router.navigate(['/dangnhap']);
  // }
  sumMoney(): number {
    return this.productService.getSumMoney();
  }
}
