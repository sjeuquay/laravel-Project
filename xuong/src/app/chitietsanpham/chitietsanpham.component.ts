import { Component, inject } from '@angular/core';
import { ProductInterface } from '../product-interface';
import { CustomersInterface } from '../customer-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chitietsanpham',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chitietsanpham.component.html',
  styleUrl: './chitietsanpham.component.css'
})
export class ChitietsanphamComponent {
  // khai báo 1 cái biến productinterface 
  // có ? là biến này vó thể lấy giá trị null
  productdetail?: ProductInterface;
  productCustomer: CustomersInterface[]=[];
  products : ProductInterface[]=[];
  productService: ProductService = inject(ProductService);
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.productService.getProductDetail('http://localhost:3000/products/' + id).then((data: ProductInterface) => {
      this.productdetail = data;
    });

    this.productService.getListCustomerCommet('http://localhost:3000/customers?location = location').then((data: CustomersInterface[]) => {
      this.productCustomer = data;
    });
  }
  addCart(quantity: string): void{
    if(this.productdetail){
      this.productService.addCart(this.productdetail, parseInt(quantity));      
    }
  }
}
