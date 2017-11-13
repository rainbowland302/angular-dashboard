import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../app.service';
import { DashboardService } from '../services/dashboard.service';
import { TeamDetailDialogComponent } from '../components/dialog/team-detail-dialog.component';
import { OVERVIEW_STATUS, TEAM_HEADER, ISILON_TEAM_HEADER, HIGHLIGHT_HEADER, TEAM_DETAIL_HEADER, ISILON_TEAM_DETAIL_HEADER, ISILON_HIGHLIGHT_HEADER, OVERVIEW_STATUS_KEYS } from '../services/dataModel';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  providers: [DashboardService]
})
export class ProductComponent implements OnInit {
  overviewStatus: any[] = OVERVIEW_STATUS;
  highlightHeader: any[] = HIGHLIGHT_HEADER;
  teamdetailHeader: any[] = TEAM_DETAIL_HEADER;
  highlightContent: any[] = [];
  teamDetailContent: any[] = [];
  teamDetail: any[] = [];
  barData: any[] = [];
  reqTrend: any[] = [];
  barStep: number = 3;

  private localState: { value:string };

  //public localState = { value: 'isilon' };

  onOpenDialog(index) {
    let rawdata = Object.assign({}, this.teamDetail[index]);
    let groups = JSON.parse(JSON.stringify(rawdata.groups));
    groups.map(raw=>{
      raw.resume = `${raw.resumeReject}/${raw.resume}`;
      raw.phone = `${raw.phoneReject}/${raw.phone}`;
      raw.onsite = `${raw.tpReject + raw.onsiteReject}/${raw.onsite}`;
      return raw;
    })
    let dialogRef = this.dialog.open(TeamDetailDialogComponent, {
      data: {
        title: rawdata.name,
        value: `${rawdata.filled}/${rawdata.total}`,
        tableHeader: this.localState.value === 'isilon' ? ISILON_TEAM_HEADER : TEAM_HEADER,
        tableContent: groups
      }
    });
  }
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    private dashboardService: DashboardService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    // get product paramater from routes params
    this.route.params.subscribe(params => {
      this.localState = { value:params['product'] };
      if(this.localState.value ==='isilon') {
        this.highlightHeader = ISILON_HIGHLIGHT_HEADER;
        this.teamdetailHeader = ISILON_TEAM_DETAIL_HEADER;
      }
      else {
        this.highlightHeader = HIGHLIGHT_HEADER;
        this.teamdetailHeader = TEAM_DETAIL_HEADER;
      }
      this.dashboardService.getOverview(this.localState.value).then(({ status, highlight }) => {
        this.overviewStatus = OVERVIEW_STATUS.map((a, i) => {
          a.value = status[OVERVIEW_STATUS_KEYS[i]];
          return a;
        });
        highlight.map(h=>{
          h.resume = `${h.resumeReject}/${h.resume}`;
          h.phone = `${h.phoneReject}/${h.phone}`;
          h.onsite = `${h.tpReject + h.onsiteReject}/${h.onsite}`;
          return h;
        })
        this.highlightContent = highlight;
      });

    this.dashboardService.getTeamNew(this.localState.value).then(teamArray => {
      this.barData = teamArray
      .map(({name, filled, open, groups})=>{
        return [{
          name,
          series:[{
            name:'Filled',
            value:filled
          },{
            name:'Open',
            value:open
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
      let detailContent = teamArray.map(team=>{
        let rawdata = Object.assign({},team);
        let groups = JSON.parse(JSON.stringify(rawdata.groups));
        return groups.map((raw, index)=>{
          if(index!==0){
            raw.name ='';
          }
          raw.resume = `${raw.resumeReject}/${raw.resume}`;
          raw.phone = `${raw.phoneReject}/${raw.phone}`;
          raw.onsite = `${raw.tpReject + raw.onsiteReject}/${raw.onsite}`;
          return raw;
        });
      });
      this.teamDetailContent = [].concat(...detailContent);

    });

    this.dashboardService.getTrend(this.localState.value)
      .then(({ reqReal, reqExpect, resumeReal, resumeExpect, interviewReal, interviewExpect, onboardReal }) => {
        this.reqTrend = [{
          name: 'Offered',
          series: reqReal || reqExpect
        }, {
          name: 'Forecast',
          series: reqExpect
        }, {
          name: 'Onboard',
          series: onboardReal || reqExpect
        }];
      });
    })
  }
}
