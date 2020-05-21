import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public data: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() {
  }

  changeMonth(direction: number) {
    const value = this.data.value.add(direction, 'month');
    this.data.next(value);
  }

  changeDay(date: moment.Moment) {
    const value = this.data.value.set({
      date: date.date(),
      month: date.month()
    });
    this.data.next(value);
  }
}
