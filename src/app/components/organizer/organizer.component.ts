import {Component, OnInit} from '@angular/core';
import {DateService} from '../../core/services/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ITask, TaskService} from '../../core/services/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  loading = true;
  tasks: ITask[] = [];
  form: FormGroup;

  constructor(public dateService: DateService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getTasks();

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  getTasks() {
    this.dateService.date
      .pipe(
        // delay(1500),
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
      console.log(taskResponse);
    }, err => console.error(err));
  }

  removeTask(task: ITask) {
    this.taskService.removeTask(task).subscribe(taskResponse => {
      this.tasks = this.tasks.filter(item => item.id !== task.id);
    }, err => console.error(err));
  }
}
