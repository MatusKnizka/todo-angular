import { InjectionToken } from '@angular/core';
import { TodoServiceProvider } from './todo-service.provider';

export const TODO_SERVICE_TOKEN = new InjectionToken<TodoServiceProvider>('TodoServiceProvider');