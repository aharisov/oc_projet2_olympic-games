import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DetailsChartData } from 'src/app/core/models/DetailsChartData';
import { MoreChartInfo } from 'src/app/core/models/MoreChartInfo';

@Component({
  selector: 'app-details-chart',
  imports: [NgxChartsModule],
  templateUrl: './details-chart.component.html',
  styleUrl: './details-chart.component.scss'
})
export class DetailsChartComponent implements OnInit {
  @Input() data!: DetailsChartData[];
  @Input() moreInfo!: MoreChartInfo[];

  chartData: DetailsChartData[] = [];
  showMoreInfo: boolean = false; // show or not additional data of the game
  currentYearInfo: MoreChartInfo = { // additional data of the game
        year: 0,
        city: '',
        medalsCount: 0,
        athleteCount: 0
  }; 

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
      // console.info('more', this.moreInfo[0])
      this.chartData = this.data;
    }, 200)
  }

  onSelect(event: any) {
    if (event.name) {
      // get data for chosen year
      this.currentYearInfo = this.moreInfo.filter(el => el.year == event.name)[0];
      
      setTimeout(() => {
        this.showMoreInfo = true;
      }, 200)
    }
  }

  onDeactivate(data: any): void {
    setTimeout(() => {
      this.showMoreInfo = false;
    }, 500)
  }
}
