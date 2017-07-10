import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser'
import { MdDialogModule } from '@angular/material';

import { HomeComponent } from './home.component';
import { PieComponent } from '../components/pie/pie.component';
import { BarComponent } from '../components/bar/bar.component';
import { LineComponent } from '../components/line/line.component';
import { StandardTableComponent } from '../components/standard-table/standard-table.component';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MdDialogModule
  ],
  declarations: [
    HomeComponent,
    PieComponent,
    BarComponent,
    LineComponent,
    StandardTableComponent,
    TeamDetailDialogComponent
  ],
  entryComponents: [ TeamDetailDialogComponent ]
})

export class HomeModule { }
