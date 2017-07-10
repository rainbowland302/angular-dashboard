import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { AppState } from '../app.service';
import { DashboardService } from '../services/dashboard.service';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';

@Component({
  selector: 'home',  // <home></home>
  templateUrl: './home.component.html',
  providers: [DashboardService]
})
export class HomeComponent implements OnInit {
  overviewGroup: any[] = [];
  barData: any[] = [];
  detailGroup: any[] = [];
  reqTrend: any[] = [];

  resumeTrend: any[] = [];
  interviewTrend: any[] = [];
  selectedOption: string;

  public localState = { value: '' };

  onOpenDialog(title: string) {
    let dialogRef = this.dialog.open(TeamDetailDialogComponent, {
      data: {
        title,
        tableHeader: [{ key: 'status', value: 'Hiring Status' }, { key: 'value', value: 'Count' }],
        tableContent: [{ status: 'Onboard', value: 3 }, { status: 'Offered', value: 2 }, { status: 'Open', value: 1 }]
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

    this.dashboardService.getPosition()
      .then(({ overviewGroup, detailGroup, hireGroup }) => {
        this.overviewGroup = overviewGroup;
        this.detailGroup = [...detailGroup.slice(0, 1), overviewGroup[0], overviewGroup[1], ...detailGroup.slice(1)];
        // Show 3 bar chart one row
        this.barData = hireGroup
          .map(({ name, filled, total }) => {
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
          })
          .reduce((a, b, i) => {
            if (i % 3 === 0) return [...a, [b]]
            else {
              a[a.length - 1].push(b)
              return a;
            }
          }, []);
      });      
  }
}
