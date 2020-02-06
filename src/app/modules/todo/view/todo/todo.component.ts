import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { TodoService } from 'src/app/modules/core/services/todo/todo.service';
import { TODO_SERVICE_TOKEN } from 'src/app/modules/core/services/todo/todo-service.token';
import { Priority } from '../../../core/definitions/priority.enum';
import { Todo } from 'src/app/modules/core/definitions/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: FormArray;
  todoInputFormControl: FormControl = new FormControl('');
  orderByFormControl: FormControl = new FormControl('PRIORITY');

  readonly orderTypes = [
    {
      type: 'PRIORITY',
      label: 'Priority'
    }, {
      type: 'DUE',
      label: 'Due date'
    }
  ];

  constructor(@Inject(TODO_SERVICE_TOKEN) private todoService: TodoService) { }

  ngOnInit() {
    this.load();
    this.orderByFormControl.valueChanges.subscribe(() => this.load());
  }

  load(): void {
    this.todos = new FormArray(this.todoService.get(this.orderByFormControl.value).map(this.mapFormGroup));
    this.todos.valueChanges.subscribe((todos: Array<Todo>) => this.todoService.save(todos));
  }

  saveTodo(): void {
    this.todoService.saveOne({
      text: this.todoInputFormControl.value,
      priority: Priority.LOW,
      created: Date.now(),
      due: undefined,
      checked: false
    });

    this.todoInputFormControl.reset();
    this.load();
  }

  delete(created: number): void {
    this.todoService.delete(created);
    this.load();
  }

  private mapFormGroup(todo: Todo): FormGroup {
    return new FormGroup({
      checked: new FormControl(todo.checked),
      text: new FormControl(todo.text, {updateOn: 'blur'}),
      due: new FormControl(todo.due),
      created: new FormControl(todo.created),
      priority: new FormControl(todo.priority, {updateOn: 'change'})
    });
  }
}
