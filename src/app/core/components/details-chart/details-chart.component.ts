import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DetailsChartData } from '../../models/DetailsChartData';

@Component({
  selector: 'app-details-chart',
  imports: [NgxChartsModule],
  templateUrl: './details-chart.component.html',
  styleUrl: './details-chart.component.scss'
})
export class DetailsChartComponent implements OnInit {
  @Input() data!: DetailsChartData[];

  chartData: DetailsChartData[] = [];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Nombre de médailles';
  timeline: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.chartData = this.data;
    }, 200)
  }

  onSelect(event: any) {
    console.log('Selected point:', event);
  }
}
