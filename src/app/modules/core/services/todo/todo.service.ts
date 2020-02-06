import { Injectable, Inject } from '@angular/core';
import { STORAGE_NAME_TOKEN } from './storage-name.token';
import { Todo } from '../../definitions/todo.model';
import { TodoServiceProvider } from './todo-service.provider';

@Injectable()
export class TodoService implements TodoServiceProvider {

    constructor(@Inject(STORAGE_NAME_TOKEN) private storageName: string) {
        if(!localStorage.getItem(this.storageName)) {
            localStorage.setItem(this.storageName, '[]');
        }
    }

    get(orderBy?: string): Array<Todo> {
        const todos = JSON.parse(localStorage.getItem(this.storageName));

        switch(orderBy) {
            case 'PRIORITY': 
                return todos.sort((t1: Todo, t2: Todo) => {
                    return t1.priority === 'HIGH' && t2.priority === 'LOW' ? -1 : 1;
                });

            case 'DUE': 
                return todos.sort((t1: Todo, t2: Todo) => {
                    return new Date(t1.due).getTime() > new Date(t2.due).getTime() ? 1 : -1;
                });
            default:
                return todos;
        }
    }

    save(todos: Array<Todo>) {
        localStorage.setItem(this.storageName, JSON.stringify(todos));
    }

    saveOne(todo: Todo) {
        const todos = this.get();
        todos.push(todo);
        localStorage.setItem(this.storageName, JSON.stringify(todos));
    }

    delete(created: number) {
        const todos = this.get();
        this.save(todos.filter(todo => todo.created !== created));
    } 
}