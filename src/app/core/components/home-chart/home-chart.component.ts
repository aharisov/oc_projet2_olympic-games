import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  @Input() data!: HomeChartData[];

  chartData: HomeChartData[] = [];
  chartView: [number, number] = [0, 0];

  // options
  isGradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  isLabelsTrimmed: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.chartData = this.data;
    }, 200)
  }

  onSelect($event: any) {
    let countryName = $event.name.toLowerCase().replace(' ', '_');
    
    this.router.navigate(['/details', countryName]);
  }
}
