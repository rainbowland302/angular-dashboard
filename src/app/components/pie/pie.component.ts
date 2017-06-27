import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'pie',
  templateUrl: './pie.component.html',
})
export class PieComponent {
  @Input() pieData: any[];

  view: any[] = [300, 300];

  // options
  showLegend = false;

  colorScheme = {
    domain: ['deepskyblue', 'lightgray']
  };
  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = false;

  ngOnInit() {

  }
}
