import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component.ts';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/isilon', pathMatch: 'full'  },
  { path:':product', component: ProductComponent }
];
