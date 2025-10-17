import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DetailsChartComponent } from 'src/app/components/details-chart/details-chart.component';
import { NumbersListComponent } from 'src/app/components/numbers-list/numbers-list.component';
import { DetailsChartData } from 'src/app/core/models/DetailsChartData';
import { DetailChartSeriesData } from 'src/app/core/models/DetailsChartSeriesData';
import { MoreChartInfo } from 'src/app/core/models/MoreChartInfo';
import { NumberItem } from 'src/app/core/models/NumberItem';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [NumbersListComponent, DetailsChartComponent, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<Olympic[]>;
  public countryId: string = '';

  numberList: NumberItem[] = [];
  pageTitle: string = '';
  chartData!: DetailsChartData[];
  moreInfo: MoreChartInfo[] = [];

  constructor(
    private olympicService: OlympicService,
    public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    this.countryId = this.activatedRoute.snapshot.params['id'];

    this.setPageTitle();
    this.calculateNumbers();
    this.setChartData();
  }

  ngOnDestroy(): void {
    // remove seo data on component's destroy
    this.metaService.removeTag('name="title"');
    this.metaService.removeTag('name="description"');
  }

  /**
   * Helper-function to calculate number of country's participations,
   * number of medals and athletes
   */
  calculateNumbers(): void {
    this.olympics$.subscribe(
      (data) => {
        let gamesCounter = 0;
        let medalsCounter = 0;
        let athletCounter = 0;
        
        data.map((item: Olympic) => {
            let country = item.country.toLowerCase().replace(' ', '_');

            if (country === this.countryId) {
              // count number of participations
              if (gamesCounter < item.participations.length) {
                gamesCounter = item.participations.length;
              }

              // count whole number of medals and athletes
              item.participations.map(el => {
                medalsCounter += el.medalsCount;
                athletCounter += el.athleteCount;
              });

              // seo: add page description
              this.metaService.addTag({
                name: "description",
                content: "Total number of medals: " + medalsCounter,
              })
            }
          }
        )

        // pass calculated data to numbers list component
        this.numberList = [
          {
            title: "Number of entries",
            number: gamesCounter
          },
          {
            title: "Total number of medals",
            number: medalsCounter
          },
          {
            title: "Total number of athletes",
            number: athletCounter
          }
        ];
      }
    );
  }

  /**
   * Helper-function for getting country's name and making it page's title
   */
  setPageTitle(): void {
    this.olympics$.subscribe(
      (data) => {
        data.map((item: Olympic) => {
            let country = item.country.toLowerCase().replace(' ', '_');

            if (country === this.countryId) {
              this.pageTitle = item.country;

              // seo: set page title
              this.titleService.setTitle(this.pageTitle);
            }
          }
        )
      }
    );
  }

  /**
   * Helper-function to prepare data for the chart
   */
  setChartData(): void {
    this.olympics$.subscribe(
      (data) => {
        data.map((item: Olympic) => {
            let country = item.country.toLowerCase().replace(' ', '_');
            let seriesData: DetailChartSeriesData[] = [];

            if (country === this.countryId) {
              // make array of medals number by year
              item.participations.map(el => {
                  seriesData.push({ 
                    name: el.year.toString(),
                    value: el.medalsCount
                  })

                  this.moreInfo.push({
                    year: el.year,
                    city: el.city,
                    medalsCount: el.medalsCount,
                    athleteCount: el.athleteCount
                  })
                }
              );

              // prepare data for the chart
              this.chartData = [
                {
                  "name": item.country,
                  "series": seriesData,
                },
              ];
            }
          }
        )
      }
    );
  }
}
