import { Component, NgModule, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as d3 from 'd3';

@Component({
  selector: 'line',
  templateUrl: './line.component.html',
})
export class LineComponent {
  @Input() lineData: any[];
  @Input() chartTitle: string;
  @Input() chartWidth: string;
  view: any[] = [800, 300];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = '';
  curve = d3.curveBasis;

  colorScheme = {
    domain: ['green', 'deepskyblue']
  };

  // line, area
  autoScale = true;

  ngOnInit() {
    console.log(d3);
    if(this.chartWidth) this.view = [Number(this.chartWidth), 300];
  }

}
