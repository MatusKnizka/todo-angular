import { Todo } from '../../definitions/todo.model';

export interface TodoServiceProvider {
    get(): Array<Todo>;
    save(todos: Array<Todo>): void;
    saveOne(todo: Todo): void;
    delete(created: number): void;
}