import {Component, OnInit} from '@angular/core';
import {DateService} from '../../core/services/date.service';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  date: BehaviorSubject<moment.Moment>;

  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.date = this.dateService.date;
  }

  toGo(direction: number) {
    this.dateService.changeMonth(direction);
}
}
