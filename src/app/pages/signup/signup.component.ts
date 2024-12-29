import { Component, forwardRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { SignupService } from '../../services/signup.service';
import { InputComponent } from '../../components/input/input.component';

interface ISignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, DefaultLoginLayoutComponent, InputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup<ISignupForm>;

  constructor(
    private router: Router,
    private signupService: SignupService,
    private toastrService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.signupService
      .signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.confirmPassword
      )
      .subscribe({
        next: () => this.toastrService.success('Cadastro bem sucedido!'),
        error: () => this.toastrService.error('Erro ao fazer cadastro!'),
      });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
