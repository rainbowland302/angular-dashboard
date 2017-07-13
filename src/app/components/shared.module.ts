import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MdDialogModule } from '@angular/material';

import { PieComponent } from './pie/pie.component';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { StandardTableComponent } from './standard-table/standard-table.component';
import { TeamDetailDialogComponent } from './dialog/team-detail-dialog.component';

const SHARED_COMPONENTS = [PieComponent, BarComponent, LineComponent, StandardTableComponent, TeamDetailDialogComponent];

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MdDialogModule
  ],
  declarations: SHARED_COMPONENTS,
  exports: SHARED_COMPONENTS
})

export class SharedModule { }
