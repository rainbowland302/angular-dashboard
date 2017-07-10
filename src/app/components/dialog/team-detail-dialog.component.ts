import { Component, NgModule, Inject, EventEmitter } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'teamDetailDialog',
  templateUrl: './team-detail-dialog.component.html',
})
export class TeamDetailDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<TeamDetailDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }
}
