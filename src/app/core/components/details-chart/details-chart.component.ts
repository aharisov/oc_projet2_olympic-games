import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-details-chart',
  imports: [NgxChartsModule],
  templateUrl: './details-chart.component.html',
  styleUrl: './details-chart.component.scss'
})
export class DetailsChartComponent {
  chartData: any[] = [
    {
      "name": "Italy",
      "series": [
        {
          "name": "2012",
          "value": 28
        },
        {
          "name": "2016",
          "value": 28
        },
        {
          "name": "2020",
          "value": 40
        }
      ],
    },
  ];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Nombre de médailles';
  timeline: boolean = true;
}
