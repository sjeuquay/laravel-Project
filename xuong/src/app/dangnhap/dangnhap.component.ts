import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dangnhap.component.html',
  styleUrl: './dangnhap.component.css'
})
export class DangnhapComponent {
  productService: ProductService = inject(ProductService);
  email: string = "";
  password: string = "";
  userService: UserService = inject(UserService);
  user: any[] = [];

  constructor(private router: Router) { }

  isEmailValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
    console.log(email);
  }

  isPasswordValid(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    // (?=.*\d)        //bao gồm ít nhất một chữ số
    // (?=.*[a-z])     //bao gồm ít nhất một chữ cái thường
    // (?=.*[A-Z])     //bao gồm ít nhất một chữ cái viết hoa
    // .{8,20}         //có từ 6 đến 20 ký tự
    return re.test(password);
  }



  async onSubmit() {

    if (!this.email || !this.password) {
      return
    }
    if (!this.isEmailValid(this.email)) {
      return
    }
    if (!this.isPasswordValid(this.password)) {
      return
    }

    try {
      const response = await fetch('http://localhost:3000/users?email=' + this.email);
      const data = await response.json();
      
      // this.productService.getUser(data);
      
      if (data.length > 0) {
        const user = data[0];
        const isPasswordValid = await bcrypt.compare(this.password, user.password);
        if (isPasswordValid) {
          alert('Đăng nhập thành công');
          this.userService.setUser(user);
          this.router.navigate(['/trangchu']);
        } else {  
          alert('Email hoặc mật khẩu không đúng.');
          return;
        }
      } else {
        alert('Email hoặc mật khẩu không đúng.');
        return;
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert('Đã xảy ra lỗi khi đăng nhập.');
    }
  }

  getuser() {
    // console.log(this.data);
  }
}
