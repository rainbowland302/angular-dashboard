import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../components/shared.module.ts';
import { EcsComponent } from './ecs.component';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    EcsComponent
  ],
  entryComponents: [ TeamDetailDialogComponent ]
})

export class EcsModule { }
