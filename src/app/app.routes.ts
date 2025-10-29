import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './membership/core/shell/shell.layout.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Productivity Planner',
    loadComponent: () =>
      import('./visitor/home/home.page.component').then(
        (c) => c.HomePageComponent,
      ),
  },
  {
    path: 'signup',
    title: 'Signup',
    loadComponent: () =>
      import('./visitor/signup/signup.page.component').then(
        (c) => c.SignupPageComponent,
      ),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./visitor/login/login.page.component').then(
        (c) => c.LoginPageComponent,
      ),
  },
  {
    path: 'app',
    title: 'Productivity Planner',
    component: ShellLayoutComponent,
    loadChildren: () =>
      import('./membership/membership.routes').then((r) => r.membershipRoutes),
  },
];
