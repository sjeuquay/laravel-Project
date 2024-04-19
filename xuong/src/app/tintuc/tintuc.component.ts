import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { NewsInterface } from '../news-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tintuc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tintuc.component.html',
  styleUrl: './tintuc.component.css'
})
export class TintucComponent {
  NewsList: NewsInterface[] = [];
  productService: ProductService = inject(ProductService);

  constructor() {
    this.productService.getListNews('http://localhost:3000/news').then((data: NewsInterface[]) => {
      this.NewsList = data;
    }
    );
  }
}
