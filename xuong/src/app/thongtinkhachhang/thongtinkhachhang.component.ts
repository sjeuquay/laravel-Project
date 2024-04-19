import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-thongtinkhachhang',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './thongtinkhachhang.component.html',
  styleUrl: './thongtinkhachhang.component.css'
})
export class ThongtinkhachhangComponent {
  userService: UserService = inject(UserService);
  email: string = "";
  phone: string = "";
  address: string = "";
  imagePreview: string | ArrayBuffer | null = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png';
  image: string = "";
  user = this.userService.getUser();
  getUser: any = {};
  constructor(private router: Router) { 
    this.user;
    console.log(this.user);
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
    console.log(this.user.email);
    console.log(this.user.phone);
    console.log(this.user.username);
    console.log(this.user.address);
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
      const response = await fetch('http://localhost:3000/users?email=' + this.user.email);
      const data = await response.json();;
      if (data.length > 0) {
        // return;
          
        const user = data[0];
        user.username = this.user.username;
        user.phone = this.user.phone;
        user.address = this.user.address;
        const url = 'http://localhost:3000/users/' + user.id; // Thay đổi URL theo cài đặt JSON Server
        console.log(url);

        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        };

        const UpdateResponse = await fetch(url, options);
        console.log(UpdateResponse);

        const updateUser = await UpdateResponse.json();
        console.log("đã thêm thành công", updateUser);
        alert('Cập nhật thành công');
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert('Đã xảy ra lỗi khi đăng nhập.');
    }
  }
  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
