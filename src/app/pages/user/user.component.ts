import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  username = this.cookieService.get('username');

  logout() {
    this.toastrService.warning('Saindo da conta...');
    setTimeout(() => {
      this.authService.logout();
      window.location.reload();
    }, 3000);
  }
}
