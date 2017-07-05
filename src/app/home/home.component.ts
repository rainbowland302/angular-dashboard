import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.service';

import { tableHeader, tableContent } from '../services/data'
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'home',  // <home></home>
  templateUrl: './home.component.html',
  providers: [DashboardService]
})
export class HomeComponent implements OnInit {
  overviewGroup: any[] = [];
  barData: any[] = [];
  detailGroup: any[] = [];
  tableHeader: any[] = [];
  tableContent: any[] = [];
  reqTrend: any[] = [];
  resumeTrend: any[] = [];
  interviewTrend: any[] = [];

  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    private dashboardService: DashboardService,
  ) { }

  public ngOnInit() {
    //this.overviewGroup = overviewGroup;

    //this.detailGroup = detailGroup;
    this.tableHeader = tableHeader;
    this.tableContent = tableContent;

    this.dashboardService.getTrend()
      .then(({ reqReal, reqExpect, resumeReal, resumeExpect, interviewReal, interviewExpect }) => {
        this.reqTrend = [{
          name: 'Trend',
          series: reqReal
        }, {
          name: 'Forecast',
          series: reqExpect
        }];
        this.resumeTrend = [{
          name: 'Trend',
          series: resumeReal
        }, {
          name: 'Forecast',
          series: resumeExpect
        }];
        this.interviewTrend = [{
          name: 'Trend',
          series: interviewReal
        }, {
          name: 'Forecast',
          series: interviewExpect
        }];
      })

    this.dashboardService.getPosition()
      .then(({ overviewGroup, detailGroup, hireGroup }) => {
        this.overviewGroup = overviewGroup;
        this.detailGroup = detailGroup;
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
      })
  }
}
