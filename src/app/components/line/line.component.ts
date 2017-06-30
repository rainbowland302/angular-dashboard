import { Component, NgModule, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as d3 from 'd3';

@Component({
  selector: 'line',
  templateUrl: './line.component.html',
})
export class LineComponent {
  @Input() lineData: any[];
  view: any[] = [800, 300];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  curve = d3.curveBasis;

  colorScheme = {
    domain: ['green', 'deepskyblue']
  };

  // line, area
  autoScale = true;

  ngOnInit() {
    console.log(d3);
  }

}
