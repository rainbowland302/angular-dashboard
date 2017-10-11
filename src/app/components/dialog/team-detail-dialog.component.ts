import { Component, NgModule, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'teamDetailDialog',
  templateUrl: './team-detail-dialog.component.html',
})
export class TeamDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TeamDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
