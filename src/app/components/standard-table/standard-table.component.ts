import { Component, Input } from '@angular/core';

@Component({
  selector: 'standard-table',
  templateUrl: './standard-table.component.html',
})
export class StandardTableComponent {
  @Input() tableHeader: {key: string, value: string}[];
  @Input() tableContent: any[];
}
