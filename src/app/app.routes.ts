import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { DashboardPageComponent } from './membership/dashboard/dashboard.page.component';

export const routes: Routes = [
    {   title: 'Productivity Planner',
        path: '',
        component: HomePageComponent
    },
    {   title: 'Signup',
        path: 'signup',
        component: SignupPageComponent
    },
    {   title: 'Login',
        path: 'login',
        component: LoginPageComponent
    },
    {   title: 'Dashboard',
        path: 'app/dashboard',
        component: DashboardPageComponent
    }
];
