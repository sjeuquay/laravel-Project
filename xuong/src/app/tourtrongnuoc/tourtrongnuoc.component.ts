import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tourtrongnuoc',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './tourtrongnuoc.component.html',
  styleUrl: './tourtrongnuoc.component.css'
})
export class TourtrongnuocComponent {
  uniqueTypes: Set<string> = new Set(); // Sử dụng Set để lưu trữ các loại sản phẩm duy nhất
  uniqueDestination: Set<string> = new Set(); // Sử dụng Set để lưu trữ các loại sản phẩm duy nhất
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  selectedType: string = '';
  selectedDestination: string = 'selectedDestination';
  productService: ProductService = inject(ProductService);
  selectedSort: string = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 6; // Số sản phẩm trên mỗi trang

  constructor() { }

  ngOnInit() {
    this.productService.getListProducts('http://localhost:3000/products?kind=trong nước').then((data: ProductInterface[]) => {
      this.products = data;
      this.filteredProducts = data; // Khởi tạo danh sách sản phẩm lọc ban đầu
      this.extractUniqueTypes(); // Gọi hàm để lọc các loại sản phẩm duy nhất
      this.extractUniqueDestination(); // Gọi hàm để lọc các loại sản phẩm duy nhất
    });
  }

  extractUniqueTypes() {
    this.products.forEach(product => {
      this.uniqueTypes.add(product.type);
      console.log(this.uniqueDestination);
      
    });
  }
  extractUniqueDestination() {
    this.products.forEach(product => {
      this.uniqueDestination.add(product.destination);
    });
  }

  onSortChange(): void {
    if (this.selectedSort === 'asc') {
      this.filteredProducts.sort((a, b) => a.sale - b.sale); // Sắp xếp tăng dần
    } else {
      this.filteredProducts.sort((a, b) => b.sale - a.sale); // Sắp xếp giảm dần
    }
  }
  filterProductsByType() {
    this.currentPage = 1; // Reset trang về 1 khi thay đổi loại sản phẩm
    this.filteredProducts = this.selectedType ? this.products.filter(product => product.type === this.selectedType) : this.products;
  }
  filterProductsBydDestination() {
    // this.currentPage = 1; // Reset trang về 1 khi thay đổi loại sản phẩm
    this.filteredProducts = this.selectedDestination ? this.products.filter(product => product.destination === this.selectedDestination) : this.products;
    console.log(this.selectedDestination);
    
  }

}
