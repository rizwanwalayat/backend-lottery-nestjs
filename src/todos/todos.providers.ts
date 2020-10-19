import { Todo } from "./todo.entity";
import { TODO_REPOSITORY } from '../core/constants'
export const todosProvider = [{
    provide: TODO_REPOSITORY,
    useValue: Todo
}]