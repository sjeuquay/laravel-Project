import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './thanhtoan.component.html',
  styleUrl: './thanhtoan.component.css'
})
export class ThanhtoanComponent {
  cart: any = [];
  paymethod: string = 'online';
  isPayOnline: boolean = true;
  productService: ProductService = inject(ProductService);
  orderService: OrderService = inject(OrderService);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  username: string = "";
  email: string = "";
  voucher: string = "";
  phone: string = "";
  note: string = "";
  address: string = "";
  status: string = "Chờ xử lý";
  pay: string = "Chưa thanh toán";
  user = this.userService.getUser();
  getUser: any = {};
  constructor(private datePipe: DatePipe) {
    this.user;
    // console.log(this.user);
  }
  ngOnInit(): void {
    this.cart = this.productService.getCart();
    // console.log(this.cart);
  }
  sumMoney(): number {
    return this.productService.getSumMoney();
  }
  onPaymentOptionChange() {
    this.isPayOnline = this.paymethod === 'online';
  }

  isEmailValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  isPhoneValid(phone: string): boolean {
    const re = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return re.test(phone);
  }

  async onSubmit() {
    if (!this.user.email || !this.user.phone || !this.user.address) {
      return
    }
    if (!this.isEmailValid(this.user.email)) {
      return
    }
    if (!this.isPhoneValid(this.user.phone)) {
      return
    }

    try {
      const response = await fetch("http://localhost:3000/users?email=" + this.user.email);
      const data = await response.json();
      const currentDate = new Date();
      const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
      console.log(formattedDate);

      if (data.length > 0) {
        const order = {
          username: this.user.username,
          email: this.user.email,
          phone: this.user.phone,
          address: this.user.address,
          note: this.note,
          name: this.cart[0].name,
          quantity: this.cart[0].quantity,
          total: this.sumMoney(),
          status: this.status,
          pay: this.pay,
          paymethod: this.paymethod,
          time: formattedDate
        };

        const url = 'http://localhost:3000/orders'; // Thay đổi URL theo cài đặt JSON Server
        // console.log(url);

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          this.productService.delete();
          this.orderService.setOrder(data);
          this.router.navigate(["/choxuly"]);
        } catch (eror) {
          console.log("lỗi");
        }
      } else {
        alert("Email không tồn tại")
        return;
      }
    } catch (eror) {
      console.log("lỗi");

    }
  }
}
