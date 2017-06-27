import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { XLargeDirective } from './x-large';
import { overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent } from '../services/data'

@Component({
  selector: 'home',  // <home></home>
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  overviewGroup: any[];
  barData: any[];
  detailGroup: any[];
  lineData: any[];
  tableHeader: any[];
  tableContent: any[];

  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
  ) { }

  public ngOnInit() {
    this.overviewGroup = overviewGroup;
    this.barData = hireGroup.map(({ name, filled, total }) => {
      return [{
        name,
        series: [{
          name: 'filled',
          value: filled
        }, {
          name: 'opened',
          value: total - filled
        }]
      }];
    });
    this.detailGroup = detailGroup;
    this.lineData = [{
      name: 'Trend',
      series: trendGroup
    }, {
      name: 'Forecast',
      series: forecastGroup
    }]
    this.tableHeader = tableHeader;
    this.tableContent = tableContent;
  }
}
