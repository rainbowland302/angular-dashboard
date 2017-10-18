import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'pie',
  templateUrl: './pie.component.html',
})
export class PieComponent implements OnChanges{
  @Input() pieData: any[];

  view: any[] = [600, 300];
  total: number;
  // options
  showLegend = false;

  // onboard, offered, open
  colorScheme = {
    domain: ['deepskyblue', 'lightgray']
  };
  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = false;

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
      this.total = cur.reduce((a,b) => a + b.value, 0);
    }
  }
}
