import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.ts';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'home',  component: HomeComponent },
];
