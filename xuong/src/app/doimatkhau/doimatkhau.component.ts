import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-doimatkhau',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './doimatkhau.component.html',
  styleUrl: './doimatkhau.component.css'
})
export class DoimatkhauComponent {
  // user: any ={};
  password: string = "";
  CurrentPassword: string = "";
  rePassword: string = "";
  userService: UserService = inject(UserService);
  user = this.userService.getUser();
  constructor(private router: Router) { }
  isPasswordValid(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    // (?=.*\d)        //bao gồm ít nhất một chữ số
    // (?=.*[a-z])     //bao gồm ít nhất một chữ cái thường
    // (?=.*[A-Z])     //bao gồm ít nhất một chữ cái viết hoa
    // .{8,20}         //có từ 6 đến 20 ký tự
    return re.test(password);
  }
  isCurrentPasswordValid(CurrentPassword: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return re.test(CurrentPassword);
  }
  isrePasswordValid(rePassword: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return re.test(rePassword);
  }

  async onSubmit() {

    if (!this.password || !this.rePassword || !this.CurrentPassword) {
      return
    }
    if (!this.isPasswordValid(this.password)) {
      return
    }
    if (!this.isCurrentPasswordValid(this.CurrentPassword)) {
      return
    }
    if (!this.isrePasswordValid(this.rePassword)) {
      return
    }

    try {
      const response = await fetch('http://localhost:3000/users?email=' + this.user.email);
      const data = await response.json();
      // console.log(data); return;

      if (data.length > 0) {
        const user = data[0];
        const isPasswordValid = await bcrypt.compare(this.CurrentPassword, this.user.password);
        if (isPasswordValid) {
          const hashedPassword = bcrypt.hashSync(this.password, 10)
          user.password = hashedPassword;
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
          this.router.navigate(["/dangnhap"]);
          alert('đổi mật khẩu thành công');
        } else {
          alert('Mật khẩu hiện tại không chính xác.');
          return;
        }
      } 
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert('Đã xảy ra lỗi khi đăng nhập.');
    }


  }
}

