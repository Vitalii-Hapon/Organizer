import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../core/services/date.service';
interface IDay {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface IWeek {
  days: IDay[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  month: IWeek[] = [];

  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.dateService.data.subscribe(this.getMonth.bind(this));
  }

  getMonth(chosenDate: moment.Moment) {
    const startMonth = chosenDate.clone().startOf('month').startOf('isoWeek');
    const endMonth = chosenDate.clone().endOf('month').endOf('isoWeek');

    const date = startMonth.clone().subtract(1, 'day');

    const month = [];

    while (date.isBefore(endMonth, 'day')) {
      month.push({
        days: Array(7)
          .fill(0)
          .map(() => {
              const value = date.add(1, 'day').clone();
              const active = moment().isSame(value, 'date');
              const disabled = !chosenDate.isSame(value, 'month');
              const selected = chosenDate.isSame(value, 'date');

              return {
                value, active, disabled, selected
              };
            }
          )
      });
    }
    this.month = month;
  }

  selectDay(date: moment.Moment) {
    console.log(date);
    this.dateService.changeDay(date);
  }
}
