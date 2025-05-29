import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {isPlatformBrowser, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf
  ]
})
export class AppComponent {
  isLoggedIn = false; // Флаг авторизации

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      this.isLoggedIn = !!token;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}


