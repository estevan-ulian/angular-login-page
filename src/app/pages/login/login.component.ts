import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

interface ILoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, InputComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<ILoginForm>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('estevan@uon.dev', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('123456', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.toastrService.success(
            'Login bem sucedido!',
            'Você será redirecionado em instantes...'
          );
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: () => this.toastrService.error('Erro ao fazer login!'),
      });
  }

  navigate() {
    this.router.navigate(['/signup']);
  }
}
