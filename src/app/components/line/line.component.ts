import { Component, NgModule, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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

  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  // line, area
  autoScale = true;

  ngOnInit() {

  }

}
