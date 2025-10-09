import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DetailsChartComponent } from 'src/app/core/components/details-chart/details-chart.component';
import { NumbersListComponent } from 'src/app/core/components/numbers-list/numbers-list.component';
import { NumberItem } from 'src/app/core/models/NumberItem';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  imports: [NumbersListComponent, DetailsChartComponent, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  public olympics$: Observable<any> = of(null);
  public countryId: string = '';

  numberList: NumberItem[] = [];
  pageTitle: string = '';

  constructor(
    private olympicService: OlympicService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    this.countryId = this.activatedRoute.snapshot.params['id'];

    this.setPageTitle();
    this.calculateNumbers();
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
            }
          }
        )
      }
    );
  }
}
