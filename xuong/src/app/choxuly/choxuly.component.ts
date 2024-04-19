import { Component, inject } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choxuly',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './choxuly.component.html',
  styleUrl: './choxuly.component.css'
})
export class ChoxulyComponent {
  orderService: OrderService = inject(OrderService);
  order = this.orderService.getOrder();
    constructor(private router: Router) {
      this.order;
      console.log(this.order);
      
    }
}
