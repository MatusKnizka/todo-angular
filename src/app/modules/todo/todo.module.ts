import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './view/todo/todo.component';
import {
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TODO_SERVICE_TOKEN } from '../core/services/todo/todo-service.token';
import { TodoService } from '../core/services/todo/todo.service';
import { STORAGE_NAME_TOKEN } from '../core/services/todo/storage-name.token';

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: TODO_SERVICE_TOKEN, useClass: TodoService},
    {provide: STORAGE_NAME_TOKEN, useValue: 'todos'}
  ]
})
export class TodoModule { }
