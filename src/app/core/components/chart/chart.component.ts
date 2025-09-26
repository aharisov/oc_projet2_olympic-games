import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  chartData: any[] = [
  {
    "name": "Germany",
    "value": 40632,
    "extra": {
      "code": "de"
    }
  },
  {
    "name": "United States",
    "value": 50000,
    "extra": {
      "code": "us"
    }
  },
  {
    "name": "France",
    "value": 36745,
    "extra": {
      "code": "fr"
    }
  },
  {
    "name": "United Kingdom",
    "value": 36240,
    "extra": {
      "code": "uk"
    }
  },
  {
    "name": "Spain",
    "value": 33000,
    "extra": {
      "code": "es"
    }
  },
  {
    "name": "Italy",
    "value": 35800,
    "extra": {
      "code": "it"
    }
  }
];
  chartView: [number, number] = [0, 0];

  // options
  isGradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  isLabelsTrimmed: boolean = false;
  labelsFormat: any = (val: any) => val + '      ';

  constructor() {
    Object.assign(this.chartData);
  }

  onSelect($event: Event) {
    throw new Error('Method not implemented.');
  }
  onActivate($event: Event) {
    throw new Error('Method not implemented.');
  }
  onDeactivate($event: Event) {
    throw new Error('Method not implemented.');
  }
}
