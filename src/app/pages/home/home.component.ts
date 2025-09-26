import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NumbersListComponent } from "src/app/core/components/numbers-list/numbers-list.component";
import { NumberItem } from 'src/app/core/models/NumberItem';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AsyncPipe, NumbersListComponent]
})

export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  numberList: NumberItem[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    
    this.calculateNumbers();
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
          }
        )

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
