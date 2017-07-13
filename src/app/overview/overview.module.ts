import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { RouterModule }   from '@angular/router';

import { SharedModule } from '../components/shared.module.ts';
import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdButtonModule,
    RouterModule
  ],
  declarations: [
    OverviewComponent,
  ]
})

export class OverviewModule { }
