import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { DashboardPageComponent } from './membership/dashboard/dashboard.page.component';
import { PlanningPageComponent } from './membership/planning/planning.page.component';
import { ProfilePageComponent } from './membership/profile/profile.page.component';
import { SettingsPageComponent } from './membership/settings/settings.page.component';
import { WorkdayPageComponent } from './membership/workday/workday.page.component';

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
    {   
        title: 'Dashboard',
        path: 'app/dashboard',
        component: DashboardPageComponent
    },
    {
        title: 'Planning',
        path: 'app/planning',
        component: PlanningPageComponent,
    },
    {
        title: 'Workday',
        path: 'app/workday',
        component: WorkdayPageComponent,
    },
    {
        title: 'Profile',
        path: 'app/profile',
        component: ProfilePageComponent,
    },
    {
        title: 'Settings',
        path: 'app/settings',
        component: SettingsPageComponent,
    },
];
