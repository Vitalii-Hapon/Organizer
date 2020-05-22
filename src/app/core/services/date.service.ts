import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() {
  }

  changeMonth(direction: number) {
    const value = this.date.value.add(direction, 'month');
    this.date.next(value);
  }

  changeDay(date: moment.Moment) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    });
    this.date.next(value);
  }
}
