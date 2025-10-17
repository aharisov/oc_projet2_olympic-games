import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NumbersListComponent } from "src/app/components/numbers-list/numbers-list.component";
import { NumberItem } from 'src/app/core/models/NumberItem';
import { Olympic } from 'src/app/core/models/Olympic';
import { HomeChartComponent } from "src/app/components/home-chart/home-chart.component";
import { HomeChartData } from 'src/app/core/models/HomeChartData';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [NumbersListComponent, HomeChartComponent]
})

export class HomeComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<Olympic[]>;

  numberList: NumberItem[] = [];
  chartData: HomeChartData[] = [];

  constructor(
    private olympicService: OlympicService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    this.calculateNumbers();

    // set seo data
    this.titleService.setTitle("L'application Jeux Olimpiques");
    this.metaService.addTag({
      name: "description",
      content: "Welcome to my apllication",
    })
  }

  ngOnDestroy(): void {
    // remove seo data on component's destroy
    this.metaService.removeTag('name="title"');
    this.metaService.removeTag('name="description"');
  }

  /**
   * Helper-function to calculate number of countries and JOs
   * and show them in the main page
   */
  calculateNumbers(): void {
    this.olympics$.subscribe(
      (data) => {
        // get number of JOs calculating max number of participations
        let gamesCounter = 0;
        data.map((item: Olympic) => {
            if (gamesCounter < item.participations.length) {
              gamesCounter = item.participations.length;
            }
            
            // count whole number of medals for every country
            let medalsCounter = 0;
            item.participations.map(el => medalsCounter += el.medalsCount);

            // add the country with it's medals number to the array for chart
            this.chartData.push({
              name: item.country,
              value: medalsCounter
            })
          }
        )

        console.info('chart data', this.chartData)

        // pass calculated data to numbers list component
        this.numberList = [
          {
            title: "Number of JOs",
            number: gamesCounter
          },
          {
            title: "Number of countries",
            number: data.length
          }
        ];
      }
    );
  }
}
