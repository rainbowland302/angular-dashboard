import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { AppState } from '../app.service';
import { DashboardService } from '../services/dashboard.service';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';
import {
  OVERVIEW_STATUS,
  OVERVIEW_HIGHLIGHT,
  OVERVIEW_STATUS_KEYS,
  OVERVIEW_HIGHLIGHT_KEYS
} from '../services/dataModel';

@Component({
  selector: 'home',  // <home></home>
  templateUrl: './home.component.html',
  providers: [DashboardService]
})
export class HomeComponent implements OnInit {
  overviewStatus: any[] = OVERVIEW_STATUS;
  overviewHighlight: any[] = OVERVIEW_HIGHLIGHT;
  teamDetail: any[] = [];
  barData: any[] = [];
  reqTrend: any[] = [];
  resumeTrend: any[] = [];
  interviewTrend: any[] = [];
  barStep: number = 3;
  //selectedOption: string;

  public localState = { value: '' };

  onOpenDialog(index) {
    let raw = this.teamDetail[index];
    let dialogRef = this.dialog.open(TeamDetailDialogComponent, {
      data: {
        title: raw.name,
        value: `${raw.filled}/${raw.total}`,
        tableHeader: [
          { key: 'onboard', value: 'Onboard' },
          { key: 'offered', value: 'Offered' },
          { key: 'open', value: 'Open' },
          { key: 'resume', value: 'Resume Screened' },
          { key: 'phone', value: 'Phone Screened' },
          { key: 'onsite', value: 'Onsite Interviews' },
        ],
        tableContent: [raw]
      }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.selectedOption = result;
    // });
  }
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    private dashboardService: DashboardService,
    public dialog: MdDialog
  ) { }

  public ngOnInit() {
    this.dashboardService.getOverview().then(({ status, highlight }) => {
      this.overviewStatus = OVERVIEW_STATUS.map((a, i) => {
        a.value = status[OVERVIEW_STATUS_KEYS[i]];
        return a;
      });
      this.overviewHighlight = OVERVIEW_HIGHLIGHT.map((a, i) => {
        a.value = highlight[OVERVIEW_HIGHLIGHT_KEYS[i]];
        return a;
      });
    });

    this.dashboardService.getTeam().then(teamArray => {
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
      });
  }
}
