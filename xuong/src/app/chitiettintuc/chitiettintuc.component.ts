import { Component, inject } from '@angular/core';
import { NewsInterface } from '../news-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chitiettintuc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chitiettintuc.component.html',
  styleUrl: './chitiettintuc.component.css'
})
export class ChitiettintucComponent {
  // có ? là biến này vó thể lấy giá trị null
  newsdetail?: NewsInterface;
  productService: ProductService = inject(ProductService);
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.productService.getNewsDetail('http://localhost:3000/news/' + id).then((data: NewsInterface) => {
      this.newsdetail = data;
      console.log(this.newsdetail);
      
    });
   
  }
}
