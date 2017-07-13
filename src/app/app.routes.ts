import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component.ts';
import { IsilonComponent } from './isilon/isilon.component.ts';
import { EcsComponent } from './ecs/ecs.component.ts';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/isilon', pathMatch: 'full'  },
  { path: 'overview',  component: OverviewComponent },
  { path: 'isilon',  component: IsilonComponent },
  { path: 'ecs',  component: EcsComponent },
];
