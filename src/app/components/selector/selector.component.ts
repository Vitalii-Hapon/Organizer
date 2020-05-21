import {Component, OnInit} from '@angular/core';
import {DateService} from '../../core/services/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(public dateService: DateService) {
  }

  ngOnInit(): void {
  }

  toGo(direction: number) {
    this.dateService.changeMonth(direction);
  }
}
