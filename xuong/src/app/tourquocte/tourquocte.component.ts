import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInterface } from '../product-interface';
import { CustomersInterface } from '../customer-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-tourquocte',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
  templateUrl: './tourquocte.component.html',
  styleUrl: './tourquocte.component.css'
})
export class TourquocteComponent {
  uniqueTypes: Set<string> = new Set(); // Sử dụng Set để lưu trữ các loại sản phẩm duy nhất
  uniqueDestination: Set<string> = new Set(); // Sử dụng Set để lưu trữ các loại sản phẩm duy nhất
  products: ProductInterface[] = [];
  productService: ProductService = inject(ProductService);
  selectedSort: string = 'asc';
  selectedDestination: string = 'selectedDestination';
  filteredProducts: ProductInterface[] = [];
  selectedType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6; // Số sản phẩm trên mỗi trang

  constructor() {}

  ngOnInit() {
    this.productService.getListProducts('http://localhost:3000/products?kind=quốc tế').then((data: ProductInterface[]) => {
      this.products = data;
      this.filteredProducts = data; // Khởi tạo danh sách sản phẩm lọc ban đầu
      this.extractUniqueTypes(); // Gọi hàm để lọc các loại sản phẩm duy nhất
      this.extractUniqueDestination();
    });
  }

  extractUniqueTypes() {
    this.products.forEach(product => {
      this.uniqueTypes.add(product.type);
    });
  }

  extractUniqueDestination() {
    this.products.forEach(product => {
      this.uniqueDestination.add(product.destination);
    });
  }

  filterProductsByType() {
    this.currentPage = 1; // Reset trang về 1 khi thay đổi loại sản phẩm
    this.filteredProducts = this.selectedType ?
      this.products.filter(product => product.type === this.selectedType) :
      this.products;
  }

  filterProductsBydDestination() {
    // this.currentPage = 1; // Reset trang về 1 khi thay đổi loại sản phẩm
    this.filteredProducts = this.selectedDestination ? this.products.filter(product => product.destination === this.selectedDestination) : this.products;
    console.log(this.selectedDestination);
    
  }

  onSortChange(): void {
    if (this.selectedSort === 'asc') {
      this.filteredProducts.sort((a, b) => a.sale - b.sale); // Sắp xếp tăng dần
    } else {
      this.filteredProducts.sort((a, b) => b.sale - a.sale); // Sắp xếp giảm dần
    }
  }
}
