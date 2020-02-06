import { Priority } from './priority.enum';

export interface Todo {
    text: string;
    priority: Priority;
    created: number;
    due: number;
    checked: boolean;
}