import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../components/shared.module.ts';
import { ProductComponent } from './product.component';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';

// BrowserModule provides services that are essential to launch and run a browser app.
// Feature modules and lazy-loaded modules should import CommonModule instead.
// They need the common directives. They don't need to re-install the app-wide providers.

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    ProductComponent
  ],
  entryComponents: [ TeamDetailDialogComponent ]
})

export class ProductModule { }
