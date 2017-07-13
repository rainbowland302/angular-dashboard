import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../components/shared.module.ts';
import { IsilonComponent } from './isilon.component';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';

// BrowserModule provides services that are essential to launch and run a browser app.
// Feature modules and lazy-loaded modules should import CommonModule instead.
// They need the common directives. They don't need to re-install the app-wide providers.

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    IsilonComponent
  ],
  entryComponents: [ TeamDetailDialogComponent ]
})

export class IsilonModule { }
