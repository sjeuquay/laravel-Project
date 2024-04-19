import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-giohang',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './giohang.component.html',
  styleUrl: './giohang.component.css'
})
export class GiohangComponent {
  selectAll: boolean = false;
  item1: boolean = false;
  item2: boolean = false;
  item3: boolean = false;
  cart: any = [];
  productService: ProductService = inject(ProductService);
  constructor() { }
  ngOnInit(): void {
    this.cart = this.productService.getCart();    
  }
  deleteCart(id: string): void {
    this.productService.deleteCart(id);
    this.cart = this.productService.getCart();
  }
  deleteAllCart(id: string): void {
    this.productService.deleteAllCart(id);
    this.cart = this.productService.getCart();
  }
  sumMoney(): number {
    return this.productService.getSumMoney();
  }
  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.item1 = isChecked;
    this.item2 = isChecked;
    this.item3 = isChecked;
  }

  updateSelectAll() {
    this.selectAll = this.item1 || this.item2 || this.item3;
  }
}
