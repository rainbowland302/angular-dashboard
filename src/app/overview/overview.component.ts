import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { DashboardService } from '../services/dashboard.service';
import { OVERVIEW_STATUS, HIGHLIGHT_HEADER, OVERVIEW_STATUS_KEYS } from '../services/dataModel';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  providers: [DashboardService]
})
export class OverviewComponent implements OnInit {
  overviewStatus: any[] = OVERVIEW_STATUS;
  highlightHeader: any[] = HIGHLIGHT_HEADER;
  highlightContent: any[] = [];
  reqTrend: any[] = [];
  resumeTrend: any[] = [];
  interviewTrend: any[] = [];

  public localState = { value: 'overview' };

  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    private dashboardService: DashboardService
  ) { }

  public ngOnInit() {
    this.dashboardService.getOverview(this.localState.value).then(({ status, highlight }) => {
      this.overviewStatus = OVERVIEW_STATUS.map((a, i) => {
        a.value = status[OVERVIEW_STATUS_KEYS[i]];
        return a;
      });
      highlight.resume = `${highlight.resumeReject}/${highlight.resume}`;
      highlight.phone = `${highlight.phoneReject}/${highlight.phone}`;
      highlight.onsite = `${highlight.onsiteReject}/${highlight.onsite}`;
      this.highlightContent = [highlight];
    });

    this.dashboardService.getTrend(this.localState.value)
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
      });
  }
}
