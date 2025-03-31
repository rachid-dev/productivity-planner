import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';

export const routes: Routes = [
    {   title: 'Productivity Planner',
        path: '',
        component: HomePageComponent
    },
    {   title: 'Signup',
        path: 'signup',
        component: SignupPageComponent
    }
];
