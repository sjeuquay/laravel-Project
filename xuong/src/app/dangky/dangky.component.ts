import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.css'
})
export class DangkyComponent {
  username: string = "";
  email: string = "";
  password: string = "";
  address: string = "";
  phone: string = "";
  gender: string = "";
  image: string = "user";
  terms: boolean = false;

  constructor (private router : Router) {}

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

  isPhoneValid(phone: string): boolean {
    const re = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return re.test(phone);
  }

  async onSubmit(): Promise<void> {
    
    if(!this.email || !this.username || !this.password || !this.phone || !this.terms){
      return
    }
    if(!this.isEmailValid(this.email)){
      return
    }
    if(!this.isPasswordValid(this.password)){
      return
    }
    if(!this.isPhoneValid(this.phone)){
      return
    }
    // trùng Email
    try{
      const response = await fetch("http://localhost:3000/users?email="+this.email);
      const data = await response.json();
      if(data.length > 0) {
        alert("Email đã tồn tại")
        return
      }
      console.log("đã thêm thành công", data);
    }catch(eror) {
      console.log("lỗi");
      
    }

    const hashedPassword = bcrypt.hashSync(this.password, 10)

    const user = {
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: hashedPassword,
      gender:  this.gender,
      terms: this.terms,
      image: this.image,
      address: this.address,
      role: "user"
    };

    const url = 'http://localhost:3000/users'; // Thay đổi URL theo cài đặt JSON Server
    // console.log(url);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    try{
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("đã thêm thành công", data);
      this.router.navigate(["/dangnhap"]);
    }catch(eror) {
      console.log("lỗi");
      
    }
  }
  TermsChange() {
    console.log('Checkbox state:', this.terms); // Log trạng thái của checkbox
  }
}
