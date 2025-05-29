import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../models/auth.model';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  authRequest: AuthRequest = {username: '', password: ''};

  constructor(private authService: AuthService, private router: Router
  ) {
  }

  onSubmit() {
    this.authService.register(this.authRequest).subscribe({
      next: (response) => {
        this.authService.login(this.authRequest).subscribe({
          next: () => {
            alert('Регистрация успешна!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Ошибка входа после регистрации:', err);
            alert('Регистрация успешна, но произошла ошибка при входе');
          }
        });
      },
      error: (err) => {
        console.error('Ошибка регистрации:', err);
        alert('Ошибка регистрации');
      }
    });
  }
}

