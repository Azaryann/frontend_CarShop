import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../models/auth.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  authRequest: AuthRequest = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.authRequest).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token); // Сохранение токена
        this.router.navigate(['/dashboard']); // Переход на другую страницу
      },
      error: (err) => {
        console.error(err);
        alert('Ошибка авторизации');
      },
    });
  }
}
