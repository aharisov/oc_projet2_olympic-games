import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  numberList: NumberItem[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    this.calculateNumbers();
  }

  /**
   * Helper-function to calculate number of country's participations,
   * number of medals and athletes
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
            number: data.length
          },
          {
            title: "Total number of athletes",
            number: data.length
          }
        ];
      }
    );
  }
}
