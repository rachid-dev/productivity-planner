import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';
import { DashboardPageComponent } from './member/dashboard/dashboard.page.component';

export const routes: Routes = [
    {   title: 'Productivity Planner',
        path: '',
        component: HomePageComponent
    },
    {   title: 'Signup',
        path: 'signup',
        component: SignupPageComponent
    },
    {   title: 'Dashboard',
        path: 'dashboard',
        component: DashboardPageComponent
    }
];
