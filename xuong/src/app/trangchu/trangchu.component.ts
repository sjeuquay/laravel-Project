import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { CustomersInterface } from '../customer-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trangchu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.css'
})
export class TrangchuComponent {
  productsHot : ProductInterface[]=[];
  productsTrongNuoc : ProductInterface[]=[];
  productsQuocTe : ProductInterface[]=[];
  locationNation : ProductInterface[]=[];
  listCustomer : CustomersInterface[]=[];
  productService: ProductService = inject(ProductService);
  selectedSort: string = 'asc';
  
  constructor(private router: Router) {
    this.productService.getListProducts('http://localhost:3000/products?hot=1').then((data:ProductInterface[])=>{
      this.productsHot = data;
    }
    );
    this.productService.getListProducts('http://localhost:3000/products?kind=trong nước').then((data:ProductInterface[])=>{
      this.productsTrongNuoc = data;
    }
    );
    this.productService.getListProducts('http://localhost:3000/products?kind=quốc tế').then((data:ProductInterface[])=>{
      this.productsQuocTe = data;
    }
    );

    this.productService.getListProducts('http://localhost:3000/products?nation= 1').then((data:ProductInterface[])=>{
      this.locationNation = data;
    }
    );

    this.productService.getListCustomer('http://localhost:3000/customers?').then((data:CustomersInterface[])=>{
      this.listCustomer = data;
    }
    );
  }
  onSearch(inputsearch: string) {
    this.productService.setKeyword(inputsearch);
    // console.log(inputsearch);
    if(this.router.url === '/timkiem'){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/timkiem']);
      }else{  
        this.router.navigate(['/timkiem']);
      }
  }

  onSortChange(): void {
    if (this.selectedSort === 'asc') {
      this.productsHot.sort((a, b) => a.sale - b.sale); // Sắp xếp tăng dần
    } else {
      this.productsHot.sort((a, b) => b.sale - a.sale); // Sắp xếp giảm dần
    }
  }
  onSortChange1(): void {
    if (this.selectedSort === 'asc') {
      this.productsTrongNuoc.sort((a, b) => a.sale - b.sale); // Sắp xếp tăng dần
    } else {
      this.productsTrongNuoc.sort((a, b) => b.sale - a.sale); // Sắp xếp giảm dần
    }
  }
  onSortChange2(): void {
    if (this.selectedSort === 'asc') {
      this.productsQuocTe.sort((a, b) => a.sale - b.sale); // Sắp xếp tăng dần
    } else {
      this.productsQuocTe.sort((a, b) => b.sale - a.sale); // Sắp xếp giảm dần
    }
  }
}
