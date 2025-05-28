import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { DashboardPageComponent } from './membership/dashboard/dashboard.page.component';
import { PlanningPageComponent } from './membership/planning/planning.page.component';
import { ProfilePageComponent } from './membership/profile/profile.page.component';
import { SettingsPageComponent } from './membership/settings/settings.page.component';
import { WorkdayPageComponent } from './membership/workday/workday.page.component';
import { ShellLayoutComponent } from './membership/core/shell/shell.layout.component';

export const routes: Routes = [
    {   
        path: '',
        title: 'Productivity Planner',
        loadComponent: () => import('./visitor/home/home.page.component').then(c => c.HomePageComponent)
    },
    {   
        path: 'signup',
        title: 'Signup',
        loadComponent: () => import('./visitor/signup/signup.page.component').then(c => c.SignupPageComponent)
    },
    {   
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./visitor/login/login.page.component').then(c => c.LoginPageComponent)
    },
    {   
        path: 'app',
        title: 'Productivity Planner',
        component : ShellLayoutComponent,
        loadChildren : () => import('./membership/membership.routes').then(r => r.membershipRoutes)
    },
];
