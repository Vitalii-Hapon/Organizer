import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';


export interface ITask {
  id?: string;
  title: string;
  date: string;
  completed: boolean;
}

interface ITaskResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url = 'https://angular-organizer-8e851.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  getTasks(date: moment.Moment): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
      }));
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http
      .post<ITaskResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map(response => {
        return {...task, id: response.name};
      }));
  }

  removeTask(task: ITask): Observable<void> {
    return this.http
      .delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`);
  }

  toggleComplete(task: ITask) {
    return this.http
      .patch<void>(`${TaskService.url}/${task.date}/${task.id}.json`,
        {completed: !task.completed});
  }
}

