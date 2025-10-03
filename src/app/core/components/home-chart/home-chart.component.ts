import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeChartData } from '../../models/HomeChartData';

@Component({
  selector: 'app-home-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './home-chart.component.html',
  styleUrl: './home-chart.component.scss'
})
export class HomeChartComponent implements OnInit {
  @Input() data!: HomeChartData[];

  chartData: HomeChartData[] = this.data;
  chartView: [number, number] = [0, 0];

  // options
  isGradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  isLabelsTrimmed: boolean = false;
  labelsFormat: any = (val: any) => val + '      ';

  constructor() {
    this.chartData ? Object.assign(this.chartData) : '';
  }

  ngOnInit(): void {
    
  }

  onSelect($event: Event) {
    throw new Error('Method not implemented.');
  }
}
