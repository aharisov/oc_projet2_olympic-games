import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NumbersListComponent } from "src/app/core/components/numbers-list/numbers-list.component";
import { NumberItem } from 'src/app/core/models/NumberItem';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AsyncPipe, NumbersListComponent]
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  numberList: NumberItem[] = [
    {
      title: "Number of JOs",
      number: 10
    },
    {
      title: "Number of countries",
      number: 5
    }
  ];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
