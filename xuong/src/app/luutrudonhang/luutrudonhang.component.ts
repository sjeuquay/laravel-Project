import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-luutrudonhang',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './luutrudonhang.component.html',
  styleUrl: './luutrudonhang.component.css'
})
export class LuutrudonhangComponent {
  userService: UserService = inject(UserService);
  async onSubmit() {}
}
