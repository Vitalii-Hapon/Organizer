import {Component, OnInit} from '@angular/core';
import {DateService} from '../../core/services/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITask, TaskService} from '../../core/services/task.service';
import {delay, switchMap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  loading: boolean;
  tasks: ITask[] = [];
  form: FormGroup;
  date: BehaviorSubject<moment.Moment>;

  constructor(private dateService: DateService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.date = this.dateService.date;
    this.getTasks();

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  getTasks() {
    this.loading = true;
    this.dateService.date
      .pipe(
        delay(1500),
        switchMap(value => this.taskService.getTasks(value))
      )
      .subscribe(tasks => {
        this.tasks = tasks;
        this.loading = false;
      });
  }

  createTask() {
    const {title} = this.form.value;

    const task: ITask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      completed: false
    };

    this.taskService.createTask(task).subscribe(taskResponse => {
      this.tasks.push(taskResponse);
      this.form.reset();
    }, err => console.error(err));
  }

  removeTask(task: ITask) {
    this.taskService.removeTask(task).subscribe(taskResponse => {
      this.tasks = this.tasks.filter(item => item.id !== task.id);
    }, err => console.error(err));
  }

  toggleComplete(task: ITask) {
    if (task.completed === true) {
      const state = false;
      this.changeTaskState(task, state);
    } else {
      const state = true;
      this.changeTaskState(task, state);
    }
  }

  changeTaskState(task: ITask, state: boolean) {
    this.taskService.changeTaskState(task, state).subscribe(taskResponse => {
      this.tasks.find(item => item.id === task.id).completed = state;
    });
  }

  taskStateTitle(task: ITask): string {
    if (task.completed === true) {
      return 'unFinish';
    } else {
      return 'Finish';
    }
  }
}
