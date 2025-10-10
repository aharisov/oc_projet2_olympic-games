import { Component, Input } from '@angular/core';
import { NumberItem } from 'src/app/core/models/NumberItem';

@Component({
  selector: 'app-numbers-list',
  standalone: true,
  imports: [],
  templateUrl: './numbers-list.component.html',
  styleUrl: './numbers-list.component.scss'
})
export class NumbersListComponent {
  @Input() data!: NumberItem[];
}
