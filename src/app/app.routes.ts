import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/authguard.service';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    title: 'Minha conta',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login now!',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup now!',
  },
];
