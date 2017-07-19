import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../app.service';
import { DashboardService } from '../services/dashboard.service';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';
import { OVERVIEW_STATUS, TEAM_HEADER, ISILON_TEAM_HEADER, HIGHLIGHT_HEADER, ISILON_HIGHLIGHT_HEADER, OVERVIEW_STATUS_KEYS } from '../services/dataModel';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  providers: [DashboardService]
})
export class ProductComponent implements OnInit {
  overviewStatus: any[] = OVERVIEW_STATUS;
  highlightHeader: any[] = HIGHLIGHT_HEADER;
  highlightContent: any[] = [];
  teamDetail: any[] = [];
  barData: any[] = [];
  reqTrend: any[] = [];
  resumeTrend: any[] = [];
  interviewTrend: any[] = [];
  barStep: number = 3;

  private localState: { value:string };

  //public localState = { value: 'isilon' };

  onOpenDialog(index) {
    let raw = Object.assign({}, this.teamDetail[index]);
    raw.resume = `${raw.resumeReject}/${raw.resume}`;
    raw.phone = `${raw.phoneReject}/${raw.phone}`;
    raw.onsite = `${raw.onsiteReject}/${raw.onsite}`;
    let dialogRef = this.dialog.open(TeamDetailDialogComponent, {
      data: {
        title: raw.name,
        value: `${raw.filled}/${raw.total}`,
        tableHeader: this.localState.value === 'isilon' ? ISILON_TEAM_HEADER : TEAM_HEADER,
        tableContent: [raw]
      }
    });
  }
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    private dashboardService: DashboardService,
    public dialog: MdDialog,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    // get product paramater from routes params
    this.route.params.subscribe(params => {
      this.localState = { value:params['product'] };
      if(this.localState.value ==='isilon') this.highlightHeader = ISILON_HIGHLIGHT_HEADER;
      else this.highlightHeader = HIGHLIGHT_HEADER;
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

    this.dashboardService.getTeam(this.localState.value).then(teamArray => {
      this.barData = teamArray
        .map(({ name, onboard, offered, open, filled, total, resume, phone, onsite }) => {
          return [{
            name,
            series: [{
              name: 'Filled',
              value: filled
            }, {
              name: 'Open',
              value: open
            }]
          }]
        })
        .reduce((a, b, i) => {
          if (i % 3 === 0) return [...a, [b]]
          else {
            a[a.length - 1].push(b)
            return a;
          }
        }, []);
      this.teamDetail = teamArray;
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
    }) 
  }
}
